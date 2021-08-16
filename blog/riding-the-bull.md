---
slug: riding-the-bull
title: Riding the bull; the npm package, that is
date: 2021-08-16
author: Alexander Lolis
author_url: https://github.com/alolis
author_image_url: https://avatars.githubusercontent.com/u/82233?v=4
tags: [development, battlefield, nodejs, javascript]
---

This is a post about a specific `Node.js` library, named [bull](https://github.com/OptimalBits/bull), which is used to execute background jobs. 

The reason I am writing this is to address some cases which the library does not cover out of the box and share our experience on how we solved them in case others have the same needs.

<!--truncate-->

I assume that you are already familiar with `bull` and how to use it so I will not waste time providing instructions. The official documentation can be found [here](https://github.com/OptimalBits/bull#documentation), so I strongly recommend looking at it first before you read any further.

## Background

In a system we were working on, we had the requirement for a jobs service. That jobs service had to be written in `Node.js` for reasons that are irrelevant to this article. The important part is that the users of the system would be able to submit jobs of different types (copies, moves, compressing/extracting files, etc) to the service via a UI and then track their progress and manage them.

Even though `bull` looked promising, with a nice set of features out of the box, we still had to solve a few problems on our own. **After using this library for some time now with success**, and seeing that others have similar requirements, I thought I should share our experiences in case someone finds them useful.

We were trying to avoid using an external database and keeping in sync the jobs with `bull` since we didn't need any advanced querying, plus, it is always a pain point to keep two different sources in sync. **One source of truth is always easier...unless the code complexity increases a lot (without even providing a competitive advantage) and suddenly the problems that come with syncing do not sound that bad...**

Although we did have a few interesting iterations and used them in production for some time, we ended up going with a database after all.

:::caution
if you have been using [my fork](https://github.com/alolis/bull/tree/rapiddot2) then please stop doing so. All necessary changes are now in the official `bull` repository.
:::

## Fetching jobs by user id

#### Approach #1 - Using the `bull` API

The first pain point in our quest for a database-less solution, was, that the `bull` API does not expose a method that you can fetch all jobs by filtering the job data (in which the `userId` is kept). Even if it did, it would probably be expensive to fetch the data by going through all the Redis `HSET` structures that the library uses. 

Your only **API-based option** here is to fetch ALL the jobs with `Queue.getJobs` and do the filtering on the application level. This, of course, is not optimal at all, unless you know that your dataset will always be small. Not our case unfortunately but it might be OK for yours.

#### Approach #2 - Using a Redis secondary index

Another approach, since you will already have Redis deployed, is to **[use a Redis secondary index](how-to-tag-data-in-redis.md#using-sets-as-secondary-indexes)**. The general idea is to store a Redis `LIST` with all the job ids associated with a user id as the key. Then, you would load that list, loop it, and fetch each job with `Queue.getJob`. 

Once again, nothing is for free. You would need to add logic to maintain those lists, cleanup scripts to ensure that nothing in those lists is dead, etc. Depending on your load, this might have a performance penalty since fetching multiple jobs with one call is not available in the `bull` API, but, if you are not overdoing it I think you will be fine.

#### Approach #3 - One queue per user

Another, more complex approach, if you do not want to use a database, is to **use one queue per user** in combination with [connections re-use](https://github.com/OptimalBits/bull/blob/develop/PATTERNS.md#reusing-redis-connections). Depending on your use case and your user base, this might be just fine for you. You would still need to have all the queue objects loaded in memory at the same time, route each user request to the appropriate queue (e.g. by maintaining a `Map` with `userId->Queue` association), load all existing queues upon service initialization (and since there is no `Queue.list` method you need to [scan Redis manually to get the queue names](https://github.com/OptimalBits/bull/issues/1024#issuecomment-414478540), and then instantiate the queues), cleanup, etc. If your load is relatively small, with a couple of thousand users, you will probably be ok with this. 

If you need to have multiple queues per user, then I am telling you already that this will be far more complex than you think and you should probably avoid it. **We have already done that, it worked, but, we weren't very happy with it, it does not scale well, and it will not work in a distributed environment.** 

If you really want to give it a go, however, the following example code should give you the general idea.

#### The `UserQueue` class

```javascript
import Queue from 'bull';
import _ from 'lodash;

// Keep track of all our user queues
const userQueues = new Map();

// The `UserQueue` class can serve as a layer between `bull` and your application if you need
// multiple queues per user and implement any method that you need here in order to manage
// the underlying queues.
class UserQueue {
  constructor(userId) {
    this.queues = new Map();
  }
  
  initQueues() {
    // Initialize all your queues and for each queue add an entry to the this.queues
    // map with the queue type as a key and the Queue object as value. Each queue needs
    // to include the userId in it's name along with the queue type in order to be easily
    // identifiable e.g. somePrefix:45:copies
    
    // Make sure that you re-use Redis connections here or else you will end up with A LOT
    // of open connections since each queue requires at least 3.
  }
  
  async getJobs() {
    // You basically need to loop all queues and get the jobs from each queue. No need from filtering
    // on the application level since all the jobs belong to this user. This is a very simple example
    // however, check Queue.getJobs documentation since you might need to pass extra parameters.
    const promises = _.map(this.queues, queue => queue.getJobs());
    const jobs = await Promise.all(promises);
    
    return jobs;
  }
  
  // Add any other methods you might need to interact with the underlying queues
}

// Check if the queue is already in our Map or else instantiate it and add it before returning it
function loadUserQueue(userId) {
  if (userQueues.has(userId) {
    return userQueues.get(userId);
  } else {
    const userQueue = new UserQueue(userId);
    userQueues.set(userId, userQueue);
    
    return userQueue;
  }
}

/* 
   Upon service initialization
*/

// Load all queue key names and extract the user id from the key matches
const userIds = await getUserIdsFromQueueKeys();

// Instantiate all queues in order to start processing jobs
_.forEach(userIds, loadUserQueue);

/* 
   During normal operation
*/

// A request comes in to fetch the jobs for user 45
const userQueue = loadUserQueue(45);

const jobs = await userQueue.getJobs();

```

#### Approach #4 - Using a database

If you want to use a database, you need to built a layer in front of `bull` to bridge them together and control the flow. That layer, can be a service class, or separate functions, or whatever fits your codebase best. 

Of course, there is the issue of data synchronization. If, for example, you have some kind of cleanup script that runs `Queue.clean` every now and then, you need to remove the jobs from your database as well. That's where the [queue event handlers](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events) come in handy!

#### The `JobService` class

So, an approach with a service class would look like this:

```javascript
import Queue from 'bull';

class JobService {
  constuctor() {
    this.queues = new Map();
    
    this.initQueues();
  }
  
  /**
    Initialize all service queues.
    
    @private
  */
  initQueues() {
    // Initialize all your queues and update `this.queues`
    
    // For each queue run `this.attachQueueHandlers(queue)`
  }
  
  /**
    Attach event handlers to each queue.
    
    @private
  */
  attachQueueHandlers(queue) {
     queue.on('removed', (job) => {
       // Remove from your database
    });
  }
  
  async add(jobData) {
    // Add the job to your database
    
    // Add the job to the appropriate queue but remember to use the id from database by passing
    // it to the `Queue.add` method!
    
    return job;
  }
  
  async find(filters = {}) {
    // Use your database to find the jobs you want
  }
  
  // Add any other methods you might need to manage your jobs
}

// Global service object
const jobService = new JobService();
const job = await jobService.add(....);

```

From what you have probably already figured out, if you want more than just fetching the jobs of a specific user, then the place to add more code is here!

## Removing an active job in sandboxed environments

#### Overview

This was another pain point when we started using `bull`; the inability to remove - basically abort - a running job in a [sandboxed environment](https://github.com/OptimalBits/bull#separate-processes). The [first approach we tried](https://github.com/OptimalBits/bull/issues/1098), although it did work for us, it was a bad solution since our [fork](https://github.com/alolis/bull/tree/rapiddot) was straying way far out from the core boundaries of the library. That means, that after a while, maintenance starts becoming a nightmare. 

And of course, the nightmare became true after bluebird (which supports [promise cancellation](http://bluebirdjs.com/docs/api/cancellation.html)) was [completely removed](https://github.com/OptimalBits/bull/commit/f05e67724cc2e3845ed929e72fcf7fb6a0f92626) from the library. That would mean that our fork would not be able to be in sync with the official repo from now on. To be fair here, I think that move was 100% correct from the `bull` side and it helped us push in a far better direction. Besides, I do love a challenge!

#### Approach

So, the idea is simple: 

1. Send a `kill` signal to the sandboxed job processor
2. Handle the signal from within the processor
3. Discard the job (in order for `bull` to not retry it)
4. `process.exit` from within the processor and let `bull` do the rest

As with all recipes, these are the ingredients to make it work:

* `Job.update` to be available in the sandboxed environment ([added in v3.23.0](https://github.com/OptimalBits/bull/releases/tag/v3.23.0))
* `Job.discard` to be available in the sandboxed environment ([added in v3.24.0](https://github.com/OptimalBits/bull/releases/tag/v3.27.0))
* A high order function to wrap all our processors with the common functionality

#### The `wrapProcessor` function

The following code snippet shows a simplified version of a higher order function that can be used to wrap all your processors in order to enhance them with your functionality and keeping all that code in one place. In our own wrapper version, we do other things as well, like, processor validation, setting the state of the jobs in our database, wrapping any errors thrown, etc. Any extra functionality that you need to run before and/or after executing the processor, can be done here.

```javascript
import logger from '/your/logger';

/**
 * Wraps a processor and adds common functionality to avoid code duplication.
 * Make sure that ALL processors are exported by being wrapped first.
 *
 * @param {Function} processor
 * @throws {Error}
 * @returns {Function}
 */
function wrapProcessor(processor) {
  async function wrappedProcessor(job) {
     const exitHandler = (exitCode) => {
      logger.debug(`Received SIGTERM for job id '${job.id}' with exit code '${exitCode}' and PID '${process.pid}'`);

      // Discard the job first to ensure that it will not be retried after a process kill.
      job.discard();
     
      process.exit(exitCode);
    };

    process.on('SIGTERM', exitHandler);

    try {
      // Store the process pid in order to be able to abort the process at any time by simply killing it.
      await job.update({...job.data, pid: process.pid});

      const result = await processor(job);

      return result;
    } finally {
      // Bull internally uses a child pool of forked processors that are being re-used so we need to make sure
      // that we remove the listener before the processor returns to the pool or else we will cause memory leakage.
      process.removeListener('SIGTERM', exitHandler);
    }
  }

  return wrappedProcessor;
}

```

#### Usage

```javascript
// myProcessor.js
import wrapProcessor from '/some/path/wrap_processor.js'

async function myProcessor(job) {
   // Your processor code here
   
   return result;
}

// Wrap your processor!
export default wrapProcessor(myProcessor);

// main.js
import Queue from 'bull';
import kill from 'tree-kill';

function killJob(queue, jobId) {
  return new Promise((resolve, reject) => {
    try {
      const job = await queue.getJob(jobId);
      
      if (!job) {
        return resolve(false);
      }
      
      // You can also add an extra check here if the PID does not exist
      // and return resolve(false) if it's true.
      
      kill(job.data.pid, 'SIGTERM', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
 	} catch (e) {
 	  reject(e);
 	}
 });
}

const queue = new Queue('downloader');
queue.process('/some/path/processors/my_processor.js'')
const job = await queue.addJob({url: 'https://example.com/file1.mov'});

// The following will send a SIGTERM to the underlying job process, and if it's still active, the
// job processor will receive it, exit itself, and the job will be moved to the failed queue by bull.
await killJob(queue, job.id); 

```

And of course, you can always update the [`JobService`](riding-the-bull.md#the-jobservice-class) class and implement an `abort` method like so:

```javascript
class JobService {
  // ... omitted previous code for succinctness
  
  async load(id) {
    // Load from database
    
    // If id does not exist, throw error
    
    return job;
  }
  
  async abort(id) {
    const job = await this.load(id);
    
    await this.kill(job.data.pid);
    
    return job;
  }
  
  kill(pid) {
    // Kill code here
  }
}
```


## Attaching current state to jobs

#### Overview

The only way to get the job state with the `bull` API at the moment is `Job.getState`. That means, that first, you need to load the job(s) and then call the method. Not very convinient I am afraid, but again, for performance reasons from the `bull` side, this is how it is. 

#### Approach #1 - Dynamically attach a `state` field to jobs

Although this is not very robust since it can break any after a `bull` upgrade, it worked fine for us at the beginning (before we ended up using a database) and it might do the trick for you as well. The following function can be used to attach a `state` field on each `Job` object, which is way faster than calling `.getState` for every each one of them:

```javascript
import _ from 'lodash';

/**
 * Enum for possible job states.
 *
 * @readonly
 * @enum {String}
 */
 const JOB_STATE = {
   ACTIVE: 'active',
   WAITING: 'waiting',
   DELAYED: 'delayed',
   COMPLETED: 'completed',
   FAILED: 'failed',
   PAUSED: 'paused',
   STUCK: 'stuck',
   UNKNOWN: 'unknown'
 };

/**
 * The function will use some of the job fields in order to calculate the current state.
 *
 * @param {Job} job - The job object.
 * @see {@link https://github.com/OptimalBits/bull/issues/1076}
 */
 attachStateField(job) {
   const {
     processedOn = null,
     delay = 0,
     finishedOn = null,
     failedReason = null
   } = job;

   const statesPredicateMapping = {
     [JOB_STATE.COMPLETED]: () => _.isInteger(finishedOn) && _.isNull(failedReason),
     [JOB_STATE.ACTIVE]: () => _.isInteger(processedOn) && _.isNull(finishedOn) && _.isNull(failedReason),
     [JOB_STATE.DELAYED]: () => _.isNull(processedOn) && delay > 0,
     [JOB_STATE.WAITING]: () => _.isNull(processedOn) && delay === 0,
     [JOB_STATE.FAILED]: () => _.isString(failedReason)
    };

   job.state = _.findKey(statesPredicateMapping, predicate => predicate()) || JOB_STATE.UNKNOWN;

   return job;
}

// Usage
const queue = new Queue('downloader');
const jobs = await queue.getJobs();
_.forEach(job, attachStateField);
```

You can also check [this](https://github.com/OptimalBits/bull/issues/1076) discussion thread which includes the above plus a few more ideas in case you want to persue this any further.

#### Approach #2 - Using a database

If you are using a database, then this is pretty straightforward. You add the job in the database with a default value, like `JOB_STATE.PENDING`, and then with the use of the [queue events](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events), we can update the job state. 

The following is using the [`JobService`](riding-the-bull#the-jobservice-class) from our previous section to show you an example of how to do it:

```javascript
class JobService {
  // ... omitted previous code for succinctness
  
  /**
    Attach event handlers to each queue.
    
    @private
  */
  attachQueueHandlers(queue) {
    // Attach on queue all events that can change state like so:
     queue.on('active', (job) => {
       // Update `state` field in database
    });
    
    // Add all the necessary queue event handlers that change state
  }
}
```

## Per-user, per queue concurrency granularity 

#### Overview

The final and toughest pain point was that the concurrency of the [named processors](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueprocess) was not working as we thought it would. 

For our case, we needed to have a concurrency limit *per-user, per queue*, and at first, the named processors in combination with the `concurrency` option seemed that it might do the trick. Unfortunately, [that was not the case](https://github.com/OptimalBits/bull/issues/1113). The plan was to use one named processor per user to apply those limits. Not sure if that would have worked well  anyway, but it wasn't a viable option so we didn't pursue it any further.

The following from the `bull` documentation explains the named processors' concurrency limitation:

```javascript
/***
 * For each named processor, concurrency stacks up, so any of these three process functions
 * can run with a concurrency of 125. To avoid this behaviour you need to create an own queue
 * for each process function.
 */
const loadBalancerQueue = new Queue('loadbalancer');
loadBalancerQueue.process('requestProfile', 100, requestProfile);
loadBalancerQueue.process('sendEmail', 25, sendEmail);
loadBalancerQueue.process('sendInvitation', 0, sendInvite);
```

#### Approach #1 - One queue per queue type

If you need a per queue concurrency, then the simplest way to do it is to use separate queues. if your environment has some kind of limitation then you can also [re-use your connections](https://github.com/OptimalBits/bull/blob/develop/PATTERNS.md#reusing-redis-connections) as I have already mentioned.

In combination with the [`UserQueue`](riding-the-bull.md#the-userqueue-class) class, you could also achieve a database-less solution for a per-user, per queue concurrency granularity.

#### Approach #2 - Using a database

Let me start by saying that for our own needs, we have a more complex implementation so I will try to simplify this as much as I can to give you a general idea of what you can try on your own.

The idea is this:

1. Keep track of all jobs in a database with a `state` and a `userId` field on each entry
2. Every time a job is created, completed or failed, a `JobService` method (let's call it `addNextPendingJobs`) will take a count of currently active jobs of the user and if they have empty slots, add some more to `bull`

**Sounds straightforward, right? Wrong.** If your service accepts parallel requests, you will need to take into account any possible race conditions each time you count the active jobs of a user and deciding whether or not you should add it to the `bull` queue. 

Example scenario:

1. *Request A* comes in, you execute a database count
2. *Request B* comes in, you execute a database count
3. *Count B* returns, slots are available, code starts adding jobs to `bull`
4. Before the jobs from *Count B* have been added to bull and the `state` has been updated, *Count A *returns. Slots are available (even though they are not) and code starts adding jobs to `bull`
5. You now have more active jobs than your limit allows

So, depending on the database you are using, the atomicity level it offers, whether or not it supports transactions and exclusive locking, you will need to implement your `addNextPendingJobs` accordingly. **In other words, you need to ensure that the entries that are being read during the counting are locked like they are being updated and not allow other operations from modifying them until the transaction ends.** 

For example, in the SQL world, this can be done with `SELECT...FOR UPDATE` but this is way out of the scope of this article. **If you have NO CLUE what I am talking about then I recommend starting reading material on locking and the documentation of your database before you try anything further.**

If your database does not support any of the above, or if you want to use Redis to implement the whole thing, you could also use something like [redlock](https://github.com/mike-marcacci/node-redlock) instead. 

And of course, **you can always process everything in sequence and avoid any possible race conditions**, but it will create a bottleneck if you have a big load. As always, depending on your case, it's up to you.

Finally, you will need to use the [queue events](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events) to handle the `completed` and `failed` events and add more jobs whenever necessary. 

The updated code in our [`JobService`](riding-the-bull.md#the-jobservice-class) will look like this:

```javascript
import logger from '/your/logger';

class JobService {
  // ... omitted previous code for succinctness
  
  /**
    Attach event handlers to each queue.
    
    @private
  */
  attachQueueHandlers(queue) {
    // Attach on queue all events that can add next pending jobs like so:
     queue.on('completed', (job) => {
       // this.addNextPendingJobs
    });
    
    queue.on('failed', (job) => {
      // For the failed scenario, we need to check whether or not the failed job will automatically
      // re-run by `bull` before we try to add more jobs
      if (job.isDiscarded() || job.attemptsMade >= job.opts.attempts) {
        // this.addNextPendingJobs
      }
    });
  }
  
  async create(jobData) {
    // ... code
    
    // Add next pending jobs whenever possible without blocking
    this.addNextPendingJobs(jobData.userId, jobData.type).catch(logger.error);
  }
  
  async addNextPendingJobs(userId, jobType) {
     // Start a transaction/take lock
     
     // Count all ACTIVE entries of the specified `userId` and `jobType`
     
     // If the active are less than MAX ALLOWED then update those entries to WAITING
     // and start adding them to the appropriate `bull` queue
     
     // Commit transaction/release lock
  }
}
```

The above is simplified but it should give you some idea on how to proceed. As a final remark, **the whole approach is not bulletproof**. You need to ensure that queue stagnation will never happen in case something goes wrong in `addNextPendingJobs` and more jobs are not added to the queue. A retry strategy can be used or maybe the code that adds more jobs can live in a `setInterval` if you are using a single service. 

Like I said plenty of times before, depends on your use case and there is always room for improvement.

## Conclusion

This has been a long post but I wanted to show you that with a little creativity a lot can be accomplished. **No magic tool, or a magic library exists out there that will cover all your requirements out of the box, and being eager to jump into a custom solution from the first sign of limitation is a bad tactic**. Of course, you will need to spend some time figuring out how an existing solution works, but if its core fits your needs and you can build on top of it, then you will just need to solve a specific set of problems instead of the whole spectrum of what the existing solution is solving.

If you have any questions/feedback for any of the above, then do not hesitate to email me!
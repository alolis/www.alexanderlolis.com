---
slug: node-js-fork-is-slow-deal-with-it
title: Node.js fork is slow; Deal with it
date: 2021-09-27
description: Dealing with Node.js fork slowness
authors: alolis
tags: [development, battlefield, nodejs, javascript, no_silver_bullet]
---

Yes. I know. Forking a process in `Node.js` is slow. Instead of crying about it, let's see how we can handle it!

Let's assume that you have a service in which you:

1. Accept a request
2. Fork a process with [`child_process.fork`](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options)
3. Execute some code within that process
4. Exit from the child process
5. Complete the request

Probably the first thing you tried was to receive the request, spin up a process, do whatever you need in the processor, and exit. You timed the whole thing and your jaw dropped that it took a million years for the request to complete, even if you are just doing a `console.log('I love kittens')` inside your processor. 

Don't bother. I will tell you right now that the bottleneck is the forking.

<!--truncate-->

> "**OUTRAGEOUS!** I should have used *[INSERT_OTHER_TECH_HERE]* which is super awesomely fast and all the cool kids are using it! Some random dude on medium.com says it is true!
> 
> *-- your loud voice*

Well, instead of re-writting the whole thing in a different language, I have an alternative for you; **use a pool of forked child processes.
**

## Approach

The idea is straightforward; Upon service initialization, fork a bunch of processes, and whenever a request comes in, get a resource (a child process) from the pool and use `IPC` communication to send commands to it. After the processor completes, return it to the pool. 

The first thing for all this of course, is a pool. The good news is that there is no need to implement your own, you can just use this lovely `npm` package, [generic-pool](https://www.npmjs.com/package/generic-pool), or the native [cluster](https://nodejs.org/api/cluster.html) module depending on your use case.

For this post, I will use `generic-pool` so lets start with the processors pool which will look something like this:

```javascript title="pool.js"
import {fork} from 'child_process';
import GenericPool from 'generic-pool';
import logger from '/your/logger';

const commandProcessorsPool = GenericPool.createPool({
  create: () => {
    const modulePath = path.join(__dirname, 'processor.js');
    const commandProcessor = fork(modulePath);

    logger.debug(`Forked command processor with pid ${commandProcessor.pid}`);

    return commandProcessor;
  },
  destroy: (commandProcessor) => {
    logger.debug(`Destroying command processor with pid ${commandProcessor.pid}`);

    commandProcessor.removeAllListeners();
    commandProcessor.kill('SIGKILL');
  },
  validate: commandProcessor => commandProcessor.connected && !commandProcessor.killed
}, {
  testOnBorrow: true,
  min: 2, // Depending on your load, set a MINIMUM number of processes that should always be available in the pool
  max: 5 // Depending on your load, set a MAXIMUM number of processes that should always be available in the pool
});

commandProcessorsPool.on('factoryCreateError', logger.debug);
commandProcessorsPool.on('factoryDestroyError', logger.debug);
```

And of course, you will also need to implement the actual processor which looks like this:

```javascript title="processor.js"
import {serializeError} from 'serialize-error';
import logger from '/your/logger';
import {MESSAGE_STATUS} from './pool.js';

process.on('message', async (message) => {
  try {
    // Read and validate input data from `message` and do whatever you need to do...
    const {name} = message;
    const result = await petKitten(name);
    
    // All went well, send the result of your function to the parent process...
    process.send({status: MESSAGE_STATUS.OK, data: result});
  } catch (e) {
    logger.debug(e);

    /* 
      In the real world, your processor will probably need to handle errors as well and pass those errors to
      the parent process. Unfortunately, sending `Error` instances via `IPC` is not possible, BUT, we can just
      serialize them and then deserialize them on the parent process!
    */
    process.send({status: MESSAGE_STATUS.ERROR, data: serializeError(e)});
  }
};
```

Going back to our pool implementation, the only thing left now is the function that will be executing our commands:

```javascript title="pool.js"
// ... omitted previous code for succinctness

import {deserializeError} from 'serialize-error';

const MESSAGE_STATUS = {
  OK: 'ok',
  ERROR: 'error',
};
  
async function executeCommand(params) {
  const commandProcessor = await commandProcessorsPool.acquire();
  
  try {
    const commandProcessorTask = () => {
      return new Promise((resolve, reject) => {
        // https://nodejs.org/api/child_process.html#child_process_event_error
        commandProcessor.on('error', reject);

        commandProcessor.on('message', (message) => {
          const {status, data} = message;

          const handlersMap = {
            [MESSAGE_STATUS.OK]: () => resolve(data),
            
            // Don't forget to deserialize the error first!
            [MESSAGE_STATUS.ERROR]: () => reject(deserializeProcessorError(data)           
          };

          const handler = handlersMap[status];

          if (!handler) {
            return reject(new Error(`Unknown command processor message status '${status}'`));
          }

          handler();
        });

        commandProcessor.send(params);
      });
    };
    
    const result = await commandProcessorTask();
    
    return result;
  } finally {
    // Make sure that the command processor is returned to the pool no matter what happened
    await commandProcessorsPool.release(commandProcessor);
  }
}

export {
  MESSAGE_STATUS,
  executeCommand
}
```

For the shake of this example, I am going to assume that you are using `express.js`. The following is a very simple and short snippet on how to bring everything together, and execute a command when a request is received:

```javascript title="express.js"
import express from 'express';
import {executeCommand} from './pool.js'; // By importing the file, our pool will be initialized
import logger '/your/logger';

const app = express();

app.post('/pet_kitten', (req, res) => {
  const {name} = req.body;
  
  // If this is a long-running process, then we shouldn't really block the request by using await.
  // Depending on your case here, you might want to handle the actual command execution differently.
  executeCommand({name}).catch(logger.error);

  res.status(202); // HTTP Status Accepted
  res.json({message: `Petting ${name} is underway...`});

app.listen(3000, () => {
  logger.info(`kitten app listening at http://localhost:${port}`)
})
```

## Conclusion

Although the above was a simple real world example on how to use a pool of processes, it can be the basis for more advanced usage. For example each processor can be modified to accept various commands instead of being limited to just one function. You could also add an `onMessage` event handler to support commands that send updates while they are being executed. I will leave those for another blog post! 

Depending on your use case though, you can do a lot of different things by expanding the approach I have just described. 

**The important thing here is to remember that most of the time, the problem is not the tool, it's your attitude towards the tool. Be creative and solve shit.**
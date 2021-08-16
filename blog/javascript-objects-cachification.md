---
slug: javascript-objects-cachification
title: JavaScript Objects Cachification
date: 2020-12-19
description: Wrapping your JavaScript Objects with caching capabilities
author: Alexander Lolis
author_url: https://github.com/alolis
author_image_url: https://avatars.githubusercontent.com/u/82233?v=4
tags: [development, javascript, nodejs, caching, battlefield]
---

In one of our backend services, we have a class, that is basically the business model of the service and is used in many locations within the code. At some point, we decided that we need to do some caching since a few methods were doing very expensive calls to other remote services and they didn’t need to occur that often.

How do you add caching to a `class` that is used very often within the rest of the codebase in the least intrusive way? You wrap the `prototype` of the `class` of course! And how do you wrap the prototype of the class? With another function that does the wrapping of course!

<!--truncate-->

Our main business model (which is just a fancy name for a class that has business logic in it) requires some initialization every time it is instantiated. Therefore, we have a function that initializes and configures an instance of the `BusinessModel` which is used throughout the service. Let’s say that it looks like this:

```javascript
// Our dummy 'BusinessModel' ES6 class
class BusinessModel {
  findItem() {
    // code
  }

  findItems() {
    // code
  }

  getBasicInfo() {
    // code
  }
}

// The utility function that instantiates and initializes a 'BusinessModel'
function getBusinessModel() {
  const businessModel = new BusinessModel();
  
  // Do some initialization here and other magic things...

  return businessModel;
}
```

So, the above function is basically being called any time we need an instance of the `BusinessModel` instead of directly constructing it. If for some reason we do not want to wrap the `prototype` and go with another approach instead, this function is the perfect candidate to add caching capabilities to the freshly instantiated `businessModel`. But first things first and more about this later.

:::info 
`class` is not a real boy in JavaScript. It’s just a keyword, not a type. If you are not already aware of this, I strongly recommend reading [You Don’t Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes).
:::

We will need the code that actually adds caching capabilities to our class so I will just dump it here and try to explain a few things afterward:

```javascript
'use strict';

import _ from 'lodash';
import objectHash from 'object-hash';

const debug = require('debug')('cachify');

const KEY_PREFIX_DELIMITER = ':';

/**
 * @callback preCache
 * @param {CacheManager} cacheManager - The cache manager instance.
 * @param {String} cacheKey - The cache key used, including the prefix.
 * @param {Sting} keyPrefix - The cache key prefix.
 * @param {String} fnName - The name of the function that was wrapped.
 * @param {Array} [fnArgs=[]] - The arguments of the function that was wrapped.
 */

/**
 * @callback postTransformer
 * @param {*} data - The cached data.
 */

/**
 * Cachify configuration object.
 *
 * @typedef {Object} CachifyOptions
 * @property {preCache} [preCache=null] - The pre cache hook to call after the original function has been called and
 *   before the data have been actually cached.
 * @property {Function} [postTransformer=null] - The post data load transformer hook. Called after the data have
 *   been loaded from cache.
 * @property {String|Array|Function} [keyPrefix=cachify] - The default prefix for cache keys. If it is a function
 *   the first argument of the function will be the context object in which the function was called.
 */

/**
 * Returns a cache key prefix string.
 *
 * @param {String|Array<String>} keyPrefix - The key prefix to use for the cache key.
 * @returns {String}
 */
function getCacheKeyPrefixString(keyPrefix) {
  const keyPrefixString = Array.isArray(keyPrefix) ? keyPrefix.join(KEY_PREFIX_DELIMITER) : keyPrefix;

  return keyPrefixString;
}

/**
 * Returns a cache key which is computed by hashing the target function name and
 * the target arguments list.
 *
 * @param {String|Array<String>} keyPrefix - The key prefix to use for the cache key.
 * @param {String} fnName - The function name.
 * @param {Array} fnArgs - The function arguments list.
 * @returns {String}
 */
function getCachifyCacheKey(keyPrefix, name, args) {
  const keyPrefixString = getCacheKeyPrefixString(keyPrefix);
  const hash = objectHash({name, args}, {replacer});

  return ${keyPrefixString}${KEY_PREFIX_DELIMITER}${hash};
}

/**
 * Wraps target function with caching capabilities. The wrapped function will always return a promise
 * since it needs to check the cache first asynchronously and decide whether or not it will call
 * the original function.
 *
 * @param {CacheManager} cacheManager - The cache manager instance.
 * @param {Function} targetFn - The function we will be wrapping with a caching layer.
 * @param {CachifyOptions} options - The cachify configuration object.
 * @returns {Function} - The asynchronous wrapped function.
 */
function cachify(cacheManager, targetFn, options = {}) {
  const {
    keyPrefix = 'cachify',
    postTransformer = null,
    preCache = null,
    ttl = null
  } = options;

  const wrappedFn = async function(...args) {
    const keyPrefixString = _.isFunction(keyPrefix) ?
      getCacheKeyPrefixString(keyPrefix(this)) :
      getCacheKeyPrefixString(keyPrefix);

    const targetFnName = targetFn.name;
    const cacheKey = getCachifyCacheKey(keyPrefixString, targetFnName, args);

    const result = await cacheManager.wrap(cacheKey, async () => {
      debug({cachify} Calling original function '${targetFnName}' with cache key '${cacheKey}'...);

      const originalResult = await targetFn.apply(this, args)

      if (preCache) {
        preCache(originalResult, {
          cacheManager,
          cacheKey,
          args,
          keyPrefix: keyPrefixString,
          fnName: targetFnName
        });
      }

      return originalResult;
    }, {ttl});

    return postTransformer ? postTransformer(result) : result;
  };

  return wrappedFn;
}

/**
 * Wraps specified methods of the targetObject with caching capabilities.
 *
 * **NOTE:** Function mutates `targetObject`.
 *
 * @param {CacheManager} cacheManager - The cache manager instance.
 * @param {Object} targetObject - The object we will be wrapping.
 * @param {Object} cacheableMap - The object describing which methods of `targetObject` should be wrapped.
 * @param {CachifyOptions} [options={}] - The cachify options object.
 * @returns {Object} - The cachified object.
 */
function cachifyObject(cacheManager, targetObject, cacheableMap, options = {}) {
  _.forEach(cacheableMap, (functionConfig, functionName) => {
    if (!functionConfig) {
      debug(`{cachifyObject} Cachification for function '${functionName}' is disabled...skipping...`);

      return;
    }

    const originalFn = targetObject[functionName];

    if (!originalFn) {
      debug(`{cachifyObject} Couldn't find function '${functionName}' on target object...skipping...`);

      return;
    }

    const functionOptions = {...options, ...(_.isPlainObject(functionConfig) ? functionConfig : {})};
    const wrappedFn = cachify(cacheManager, originalFn, functionOptions);

    targetObject[functionName] = wrappedFn;
  });

  return targetObject;
}
```

A few things are going on in the code block above. You do not need to use everything but I have added them anyway because we will need them in a later post for a caching approach I will describe. Besides, they might help you with your own use case!

### Using hashes for cache keys

```javascript
function getCachifyCacheKey(keyPrefix, fnName, fnArgs) {
  const keyPrefixString = getCacheKeyPrefixString(keyPrefix);

  const hash = objectHash({name: fnName, args: fnArgs}, {replacer});

  return `${keyPrefixString}${KEY_PREFIX_DELIMITER}${hash}`;
}
```

The most important thing from the whole code is the way we generate our cache keys within the `getCachifyCacheKey` function. If you look more closely above, we are creating a hash from the name and the arguments of the function we want to cachify and the [object-hash](https://www.npmjs.com/package/object-hash) npm module helps us do just that.

The reason we do this is the fact that **we want to be able to cache results from the same function, but with different arguments, to separate cache keys**. if something simpler was used as a cache key (e.g. the function name), then we would be returning the same cached value all the time, no matter the arguments we would be passing to the function, which is not something we want.

For example, the following two **same** method calls will produce two different cache keys due to the fact that they have different arguments:

```javascript
// Cache key: b1e2f1cbcf8a99de6bbeea579d980cc0b0f3261a
businessModel.findItems({isHidden: false});

// Cache key: 493b0e3045532ab6effe912e71feb7ee26c29199
businessModel.findItems({isHidden: true});
```

### The main functions; `cachify` and `cachifyObject`

`cachify` is the function that does the main work. It will wrap a target function with caching capabilities by internally using the [cache-manager](https://www.npmjs.com/package/cache-manager) npm module. You do not really need this module for the wrapping, you could also use a lower-level library like [ioredis](https://www.npmjs.com/package/ioredis) and do the wrapping yourself. However, in our use case, we needed `cache-manager` so I used that instead. Besides, it comes with a handy method called **wrap** which is what we need.

```javascript
// Version with 'cache-manager'
function cachify(cacheManager, targetFn, options = {}) {
  // [removed code for simplicity]
  
  const wrappedFn = async function(...args) {
    // [removed code for simplicity] 

    const result = await cacheManager.wrap(cacheKey, async () => {
      const originalResult = await targetFn.apply(this, args);      
  
      return originalResult;
    }, {ttl});

    // [removed code for simplicity]
  }

  // The 'wrappedFn' which we will return is going to be asynchronous, no matter what
  return wrappedFn;
}

/*
  Alternative version without 'cache-manager' but with 'ioredis' instead. 
  It could be done better, but just giving you an idea what might look like. 
  It will basically check if the cache key exists by loading it, and if not, 
  it will call the original function and cache the result before it actually 
  returns it. Easy to implement yourself as well in case you do not go 
  with 'cache-manager'.
*/
function cachify(redis, targetFn, options = {}) {
  // [removed code for simplicity]
  
  const wrappedFn = async function(...args) {
    // [removed code for simplicity] 

    const cachedResult = await redis.get(cacheKey);

    if (cachedResult) {
      return JSON.parse(cachedResult); 
    } else {
      const originalResult = await targetFn.apply(this, args);

      const originalResultString = JSON.stringify(originalResult);
      ttl ? await redis.setex(originalResultString, ttl) : await redis.set(originalResultString);
  
      return originalResult;
    }

    // [removed code for simplicity]
  }

  // The 'wrappedFn' which we will return is going to be asynchronous, no matter what
  return wrappedFn;
}
```

The partial code above from the `cachify` function shows the current cache wrapping approach and a possible alternative.

One thing that we must note here is the use of `await` in order to communicate with the cache. That means, that even if the original function – the one we are wrapping – was not asynchronous, then it must be converted to one (by using `async` as shown above) in order for the mechanism to work properly.

I am pretty sure that in the full code at the beginning you have noticed other things already, like `preCache` and `postTransformer` hooks. Although they are not really necessary for this post, as you have already guessed they definitely have their use if you want to make more actions before and after caching the data. **Hint:** managing a [redis secondary index](how-to-tag-data-in-redis.md#using-sets-as-secondary-indexes). If your own use case needs it, you could introduce more hooks into the code.

`cachifyObject` is more like a helper function in order to easily cachify an `Object`. It will loop the object and based on a map describing which methods of the object we want to `cachify`, it will do it for us by using cachify internally.

The original methods will be overwritten and the mutated target `Object` will be returned to the caller

### Bringing everything together

The hard part is done, we have our wrapping functions ready and all we need now is to apply it to the `prototype` of the `class` we want to cachify; in our case, the `BusinessModel`.

```javascript
'use strict';

import {getRedisSingletonInstance} from '/some/magic/utils/we/have';
import {BusinessModel} from '/some/magic/models/we/have';
import CacheManager from 'cache-manager';
import redisStore from 'cache-manager-ioredis';

function cachifyBusinesModel(businessModel, {ttl = 1200} = {}) {
  const options = {
    ttl,
    keyPrefix: 'businessModel'
  };

  // The methods in this map will be targeted for cachification. 
  // Any methods that are not in this map will be left intact.
  // We also make use of postTransformer in order to convert our cached 
  // results to BusinessModel instances before returning.
  const cacheableMethodsMap = {
    findItems: {
      postTransformer: result => _.map(result, item => BusinessModel.fromJson(item)
    },
    findItem: {
      postTransformer: result => BusinessModel.fromJson(result)
      ttl: 120 // Override default ttl
    },
    getBasicInfo: true
  };

  const cacheManager = CacheManager.caching({
    store: redisStore,
    redisInstance: getRedisSingletonInstance(),
    isCacheableValue: value => value !== null && value !== false && value !== undefined
  });

  return cachifyObject(cacheManager, businessModel, cacheableMethodsMap, options);
}

// Keep the cachification call near our 'getBusinessModel' utility function
// and maybe with some explanatory comment block in order for someone new
// to easily figure out what is going on.
cachifyBusinesModel(BusinessModel.prototype);

// Make sure that you mention in the comment block here that the result 
// is cachified and point out to the reader to the correct direction in order 
// to find more details about it. 
function getBusinessModel() {
  const businessModel = new BusinessModel();
  
  // Do some initialization here...

  return businessModel; // Our businessModel instance is now cachified!
}
```

A few things I would like to note here for the code above:

1. We have implemented a `cachifyBusinesModel` function in which we will be cachifying the `businessModel` Object we pass as an argument. A `map` named `cacheableMethodsMap` contains all the methods that we want to cachify and it will be passed along with some other options (like the cache key) to our `cachifyObject` function.
2. We initializate a `CacheManager` instance which we will pass to our cachifyObject function as well. The options of the `CacheManager` are not important. What is important is how we get the redis instance. As you have noticed we use a `getRedisSingletonInstance` function which basically returns a global instance of redis that will be instantiated the first time the function is called. For every other call, the existing instance will be returned. This is important in order to avoid any code bottleneck by instantiating redis again and again everytime `cachifyBusinesModel` function is called. If we wrap the prototype, as we do in the example above, then it shouldn’t be a problem since it will only be called once. But if you go with the alternative approach (described in the next section) which wraps the instantiated object instead, then it will definitely be an issue.
3. Make sure that you comment on everything in your code in order for the caller of the `getBusinessModel` to know exactly where he is getting into.

:::info
Instead of implementing `getRedisSingletonInstance` to handle the singleton, you could use a [container](https://www.npmjs.com/package/typedi) approach.
:::

### To `prototype` or not to `prototype`

I have mentioned earlier the use of a utility function, `getBusinessModel` in which the `BussinessModel` is instantiated and initialized there. The reason that I did mention this function is because I want to point out that wrapping the `prototype` has a trade-off; code obscurity.

A new guy might miss the fact that *some* of the object methods he uses return a cached version of the result. One might say that we can add a suffix to those methods (e.g. `findItemsWithCache`) instead of overwriting the originals. Except that I find this ugly, you will also not be able to easily disable the cache in case you want to do some debugging without it. By keeping the original names, you can just turn off cachification in case you want to run the code without the cache and just let it do its thing without the hassle of changing method names as well.

Another small problem with the wrapping of the `prototype` is when we need to dynamically build our cache key prefix. If we want to use variables that are not within the object we are wrapping (which we can access them via this if we use a function as a `keyPrefix` getter) and we can not know their values beforehand, then we simply can’t do it. To be fair here, we are doing some complex caching ourselves and we haven’t bumped in such a case but it’s definitely a possibility.

A possible alternative, as you can see in the code example below, is to do the wrapping every time the `BusinessModel` is instantiated:

```javascript
// Alternative version with cachifying the instantiated object. 
// No obscurity with this version; just 'useCache' a flag that the caller 
// decides if it should be true or false. The new guy will be happier.
function getBusinessModel({useCache = true} = {}) {
  const businessModel = new BusinessModel();
  
  // Do some initialization here...

  if (useCache) {
    return cachifyBusinessModel(businessModel);
  } else {
    return businessModel;
  }
}
```

However, if you have a large amount of objects that you are instantiating, you will definitely benefit from wrapping the `prototype` _once_ instead of wrapping each instantiated object as it might become a bottleneck for your code.

If you have a very small amount of objects that you are instantiating, it might be better to use the alternative version of `getBusinessModel` from above which will also be doing the cachification. The advantage of going with this approach, even if there is a slight – almost insignificant probably – performance penalty, the code will be much less obscured. The new guy will just need to read the documentation of the function and immediately will figure out what is going on without getting crazy first!

### Conclusion

We saw that with the use of a couple of functions, we can easily add caching to expensive `Object` methods that we use often with minimum effort. Depending on our use case, and if our code is modular enough, we can achieve the same result in more than one way. I hope that I gave you some idea of how to approach this and maybe you can find improvements while you are at it. If you do, I would love to hear about them!
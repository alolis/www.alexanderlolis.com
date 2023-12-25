"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7672],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),h=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},l=function(e){var t=h(e.components);return a.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=h(n),u=i,f=p["".concat(c,".").concat(u)]||p[u]||d[u]||o;return n?a.createElement(f,r(r({ref:t},l),{},{components:n})):a.createElement(f,r({ref:t},l))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:i,r[1]=s;for(var h=2;h<o;h++)r[h]=n[h];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},21:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=n(7462),i=(n(7294),n(3905));const o={slug:"javascript-objects-cachification",title:"JavaScript Objects Cachification",date:new Date("2020-12-19T00:00:00.000Z"),description:"Wrapping your JavaScript Objects with caching capabilities",author:"Alexander Lolis",author_url:"https://github.com/alolis",author_image_url:"https://avatars.githubusercontent.com/u/82233?v=4",tags:["development","javascript","nodejs","caching","battlefield"]},r=void 0,s={permalink:"/javascript-objects-cachification",source:"@site/blog/javascript-objects-cachification.md",title:"JavaScript Objects Cachification",description:"Wrapping your JavaScript Objects with caching capabilities",date:"2020-12-19T00:00:00.000Z",formattedDate:"December 19, 2020",tags:[{label:"development",permalink:"/tags/development"},{label:"javascript",permalink:"/tags/javascript"},{label:"nodejs",permalink:"/tags/nodejs"},{label:"caching",permalink:"/tags/caching"},{label:"battlefield",permalink:"/tags/battlefield"}],readingTime:13.985,truncated:!0,prevItem:{title:"My 2020 reads",permalink:"/my-2020-reads"},nextItem:{title:"How to tag data in Redis",permalink:"/how-to-tag-data-in-redis"}},c=[{value:"Using hashes for cache keys",id:"using-hashes-for-cache-keys",children:[]},{value:"The main functions; <code>cachify</code> and <code>cachifyObject</code>",id:"the-main-functions-cachify-and-cachifyobject",children:[]},{value:"Bringing everything together",id:"bringing-everything-together",children:[]},{value:"To <code>prototype</code> or not to <code>prototype</code>",id:"to-prototype-or-not-to-prototype",children:[]},{value:"Conclusion",id:"conclusion",children:[]}],h={toc:c},l="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(l,(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In one of our backend services, we have a class, that is basically the business model of the service and is used in many locations within the code. At some point, we decided that we need to do some caching since a few methods were doing very expensive calls to other remote services and they didn\u2019t need to occur that often."),(0,i.kt)("p",null,"How do you add caching to a ",(0,i.kt)("inlineCode",{parentName:"p"},"class")," that is used very often within the rest of the codebase in the least intrusive way? You wrap the ",(0,i.kt)("inlineCode",{parentName:"p"},"prototype")," of the ",(0,i.kt)("inlineCode",{parentName:"p"},"class")," of course! And how do you wrap the prototype of the class? With another function that does the wrapping of course!"),(0,i.kt)("p",null,"Our main business model (which is just a fancy name for a class that has business logic in it) requires some initialization every time it is instantiated. Therefore, we have a function that initializes and configures an instance of the ",(0,i.kt)("inlineCode",{parentName:"p"},"BusinessModel")," which is used throughout the service. Let\u2019s say that it looks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Our dummy 'BusinessModel' ES6 class\nclass BusinessModel {\n  findItem() {\n    // code\n  }\n\n  findItems() {\n    // code\n  }\n\n  getBasicInfo() {\n    // code\n  }\n}\n\n// The utility function that instantiates and initializes a 'BusinessModel'\nfunction getBusinessModel() {\n  const businessModel = new BusinessModel();\n  \n  // Do some initialization here and other magic things...\n\n  return businessModel;\n}\n")),(0,i.kt)("p",null,"So, the above function is basically being called any time we need an instance of the ",(0,i.kt)("inlineCode",{parentName:"p"},"BusinessModel")," instead of directly constructing it. If for some reason we do not want to wrap the ",(0,i.kt)("inlineCode",{parentName:"p"},"prototype")," and go with another approach instead, this function is the perfect candidate to add caching capabilities to the freshly instantiated ",(0,i.kt)("inlineCode",{parentName:"p"},"businessModel"),". But first things first and more about this later."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},(0,i.kt)("inlineCode",{parentName:"p"},"class")," is not a real boy in JavaScript. It\u2019s just a keyword, not a type. If you are not already aware of this, I strongly recommend reading ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes"},"You Don\u2019t Know JS: this & Object Prototypes"),"."))),(0,i.kt)("p",null,"We will need the code that actually adds caching capabilities to our class so I will just dump it here and try to explain a few things afterward:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"'use strict';\n\nimport _ from 'lodash';\nimport objectHash from 'object-hash';\n\nconst debug = require('debug')('cachify');\n\nconst KEY_PREFIX_DELIMITER = ':';\n\n/**\n * @callback preCache\n * @param {CacheManager} cacheManager - The cache manager instance.\n * @param {String} cacheKey - The cache key used, including the prefix.\n * @param {Sting} keyPrefix - The cache key prefix.\n * @param {String} fnName - The name of the function that was wrapped.\n * @param {Array} [fnArgs=[]] - The arguments of the function that was wrapped.\n */\n\n/**\n * @callback postTransformer\n * @param {*} data - The cached data.\n */\n\n/**\n * Cachify configuration object.\n *\n * @typedef {Object} CachifyOptions\n * @property {preCache} [preCache=null] - The pre cache hook to call after the original function has been called and\n *   before the data have been actually cached.\n * @property {Function} [postTransformer=null] - The post data load transformer hook. Called after the data have\n *   been loaded from cache.\n * @property {String|Array|Function} [keyPrefix=cachify] - The default prefix for cache keys. If it is a function\n *   the first argument of the function will be the context object in which the function was called.\n */\n\n/**\n * Returns a cache key prefix string.\n *\n * @param {String|Array<String>} keyPrefix - The key prefix to use for the cache key.\n * @returns {String}\n */\nfunction getCacheKeyPrefixString(keyPrefix) {\n  const keyPrefixString = Array.isArray(keyPrefix) ? keyPrefix.join(KEY_PREFIX_DELIMITER) : keyPrefix;\n\n  return keyPrefixString;\n}\n\n/**\n * Returns a cache key which is computed by hashing the target function name and\n * the target arguments list.\n *\n * @param {String|Array<String>} keyPrefix - The key prefix to use for the cache key.\n * @param {String} fnName - The function name.\n * @param {Array} fnArgs - The function arguments list.\n * @returns {String}\n */\nfunction getCachifyCacheKey(keyPrefix, name, args) {\n  const keyPrefixString = getCacheKeyPrefixString(keyPrefix);\n  const hash = objectHash({name, args}, {replacer});\n\n  return ${keyPrefixString}${KEY_PREFIX_DELIMITER}${hash};\n}\n\n/**\n * Wraps target function with caching capabilities. The wrapped function will always return a promise\n * since it needs to check the cache first asynchronously and decide whether or not it will call\n * the original function.\n *\n * @param {CacheManager} cacheManager - The cache manager instance.\n * @param {Function} targetFn - The function we will be wrapping with a caching layer.\n * @param {CachifyOptions} options - The cachify configuration object.\n * @returns {Function} - The asynchronous wrapped function.\n */\nfunction cachify(cacheManager, targetFn, options = {}) {\n  const {\n    keyPrefix = 'cachify',\n    postTransformer = null,\n    preCache = null,\n    ttl = null\n  } = options;\n\n  const wrappedFn = async function(...args) {\n    const keyPrefixString = _.isFunction(keyPrefix) ?\n      getCacheKeyPrefixString(keyPrefix(this)) :\n      getCacheKeyPrefixString(keyPrefix);\n\n    const targetFnName = targetFn.name;\n    const cacheKey = getCachifyCacheKey(keyPrefixString, targetFnName, args);\n\n    const result = await cacheManager.wrap(cacheKey, async () => {\n      debug({cachify} Calling original function '${targetFnName}' with cache key '${cacheKey}'...);\n\n      const originalResult = await targetFn.apply(this, args)\n\n      if (preCache) {\n        preCache(originalResult, {\n          cacheManager,\n          cacheKey,\n          args,\n          keyPrefix: keyPrefixString,\n          fnName: targetFnName\n        });\n      }\n\n      return originalResult;\n    }, {ttl});\n\n    return postTransformer ? postTransformer(result) : result;\n  };\n\n  return wrappedFn;\n}\n\n/**\n * Wraps specified methods of the targetObject with caching capabilities.\n *\n * **NOTE:** Function mutates `targetObject`.\n *\n * @param {CacheManager} cacheManager - The cache manager instance.\n * @param {Object} targetObject - The object we will be wrapping.\n * @param {Object} cacheableMap - The object describing which methods of `targetObject` should be wrapped.\n * @param {CachifyOptions} [options={}] - The cachify options object.\n * @returns {Object} - The cachified object.\n */\nfunction cachifyObject(cacheManager, targetObject, cacheableMap, options = {}) {\n  _.forEach(cacheableMap, (functionConfig, functionName) => {\n    if (!functionConfig) {\n      debug(`{cachifyObject} Cachification for function '${functionName}' is disabled...skipping...`);\n\n      return;\n    }\n\n    const originalFn = targetObject[functionName];\n\n    if (!originalFn) {\n      debug(`{cachifyObject} Couldn't find function '${functionName}' on target object...skipping...`);\n\n      return;\n    }\n\n    const functionOptions = {...options, ...(_.isPlainObject(functionConfig) ? functionConfig : {})};\n    const wrappedFn = cachify(cacheManager, originalFn, functionOptions);\n\n    targetObject[functionName] = wrappedFn;\n  });\n\n  return targetObject;\n}\n")),(0,i.kt)("p",null,"A few things are going on in the code block above. You do not need to use everything but I have added them anyway because we will need them in a later post for a caching approach I will describe. Besides, they might help you with your own use case!"),(0,i.kt)("h3",{id:"using-hashes-for-cache-keys"},"Using hashes for cache keys"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"function getCachifyCacheKey(keyPrefix, fnName, fnArgs) {\n  const keyPrefixString = getCacheKeyPrefixString(keyPrefix);\n\n  const hash = objectHash({name: fnName, args: fnArgs}, {replacer});\n\n  return `${keyPrefixString}${KEY_PREFIX_DELIMITER}${hash}`;\n}\n")),(0,i.kt)("p",null,"The most important thing from the whole code is the way we generate our cache keys within the ",(0,i.kt)("inlineCode",{parentName:"p"},"getCachifyCacheKey")," function. If you look more closely above, we are creating a hash from the name and the arguments of the function we want to cachify and the ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/object-hash"},"object-hash")," npm module helps us do just that."),(0,i.kt)("p",null,"The reason we do this is the fact that ",(0,i.kt)("strong",{parentName:"p"},"we want to be able to cache results from the same function, but with different arguments, to separate cache keys"),". if something simpler was used as a cache key (e.g. the function name), then we would be returning the same cached value all the time, no matter the arguments we would be passing to the function, which is not something we want."),(0,i.kt)("p",null,"For example, the following two ",(0,i.kt)("strong",{parentName:"p"},"same")," method calls will produce two different cache keys due to the fact that they have different arguments:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Cache key: b1e2f1cbcf8a99de6bbeea579d980cc0b0f3261a\nbusinessModel.findItems({isHidden: false});\n\n// Cache key: 493b0e3045532ab6effe912e71feb7ee26c29199\nbusinessModel.findItems({isHidden: true});\n")),(0,i.kt)("h3",{id:"the-main-functions-cachify-and-cachifyobject"},"The main functions; ",(0,i.kt)("inlineCode",{parentName:"h3"},"cachify")," and ",(0,i.kt)("inlineCode",{parentName:"h3"},"cachifyObject")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"cachify")," is the function that does the main work. It will wrap a target function with caching capabilities by internally using the ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/cache-manager"},"cache-manager")," npm module. You do not really need this module for the wrapping, you could also use a lower-level library like ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/ioredis"},"ioredis")," and do the wrapping yourself. However, in our use case, we needed ",(0,i.kt)("inlineCode",{parentName:"p"},"cache-manager")," so I used that instead. Besides, it comes with a handy method called ",(0,i.kt)("strong",{parentName:"p"},"wrap")," which is what we need."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Version with 'cache-manager'\nfunction cachify(cacheManager, targetFn, options = {}) {\n  // [removed code for simplicity]\n  \n  const wrappedFn = async function(...args) {\n    // [removed code for simplicity] \n\n    const result = await cacheManager.wrap(cacheKey, async () => {\n      const originalResult = await targetFn.apply(this, args);      \n  \n      return originalResult;\n    }, {ttl});\n\n    // [removed code for simplicity]\n  }\n\n  // The 'wrappedFn' which we will return is going to be asynchronous, no matter what\n  return wrappedFn;\n}\n\n/*\n  Alternative version without 'cache-manager' but with 'ioredis' instead. \n  It could be done better, but just giving you an idea what might look like. \n  It will basically check if the cache key exists by loading it, and if not, \n  it will call the original function and cache the result before it actually \n  returns it. Easy to implement yourself as well in case you do not go \n  with 'cache-manager'.\n*/\nfunction cachify(redis, targetFn, options = {}) {\n  // [removed code for simplicity]\n  \n  const wrappedFn = async function(...args) {\n    // [removed code for simplicity] \n\n    const cachedResult = await redis.get(cacheKey);\n\n    if (cachedResult) {\n      return JSON.parse(cachedResult); \n    } else {\n      const originalResult = await targetFn.apply(this, args);\n\n      const originalResultString = JSON.stringify(originalResult);\n      ttl ? await redis.setex(originalResultString, ttl) : await redis.set(originalResultString);\n  \n      return originalResult;\n    }\n\n    // [removed code for simplicity]\n  }\n\n  // The 'wrappedFn' which we will return is going to be asynchronous, no matter what\n  return wrappedFn;\n}\n")),(0,i.kt)("p",null,"The partial code above from the ",(0,i.kt)("inlineCode",{parentName:"p"},"cachify")," function shows the current cache wrapping approach and a possible alternative."),(0,i.kt)("p",null,"One thing that we must note here is the use of ",(0,i.kt)("inlineCode",{parentName:"p"},"await")," in order to communicate with the cache. That means, that even if the original function \u2013 the one we are wrapping \u2013 was not asynchronous, then it must be converted to one (by using ",(0,i.kt)("inlineCode",{parentName:"p"},"async")," as shown above) in order for the mechanism to work properly."),(0,i.kt)("p",null,"I am pretty sure that in the full code at the beginning you have noticed other things already, like ",(0,i.kt)("inlineCode",{parentName:"p"},"preCache")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"postTransformer")," hooks. Although they are not really necessary for this post, as you have already guessed they definitely have their use if you want to make more actions before and after caching the data. ",(0,i.kt)("strong",{parentName:"p"},"Hint:")," managing a ",(0,i.kt)("a",{parentName:"p",href:"/how-to-tag-data-in-redis#using-sets-as-secondary-indexes"},"redis secondary index"),". If your own use case needs it, you could introduce more hooks into the code."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"cachifyObject")," is more like a helper function in order to easily cachify an ",(0,i.kt)("inlineCode",{parentName:"p"},"Object"),". It will loop the object and based on a map describing which methods of the object we want to ",(0,i.kt)("inlineCode",{parentName:"p"},"cachify"),", it will do it for us by using cachify internally."),(0,i.kt)("p",null,"The original methods will be overwritten and the mutated target ",(0,i.kt)("inlineCode",{parentName:"p"},"Object")," will be returned to the caller"),(0,i.kt)("h3",{id:"bringing-everything-together"},"Bringing everything together"),(0,i.kt)("p",null,"The hard part is done, we have our wrapping functions ready and all we need now is to apply it to the ",(0,i.kt)("inlineCode",{parentName:"p"},"prototype")," of the ",(0,i.kt)("inlineCode",{parentName:"p"},"class")," we want to cachify; in our case, the ",(0,i.kt)("inlineCode",{parentName:"p"},"BusinessModel"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"'use strict';\n\nimport {getRedisSingletonInstance} from '/some/magic/utils/we/have';\nimport {BusinessModel} from '/some/magic/models/we/have';\nimport CacheManager from 'cache-manager';\nimport redisStore from 'cache-manager-ioredis';\n\nfunction cachifyBusinesModel(businessModel, {ttl = 1200} = {}) {\n  const options = {\n    ttl,\n    keyPrefix: 'businessModel'\n  };\n\n  // The methods in this map will be targeted for cachification. \n  // Any methods that are not in this map will be left intact.\n  // We also make use of postTransformer in order to convert our cached \n  // results to BusinessModel instances before returning.\n  const cacheableMethodsMap = {\n    findItems: {\n      postTransformer: result => _.map(result, item => BusinessModel.fromJson(item)\n    },\n    findItem: {\n      postTransformer: result => BusinessModel.fromJson(result)\n      ttl: 120 // Override default ttl\n    },\n    getBasicInfo: true\n  };\n\n  const cacheManager = CacheManager.caching({\n    store: redisStore,\n    redisInstance: getRedisSingletonInstance(),\n    isCacheableValue: value => value !== null && value !== false && value !== undefined\n  });\n\n  return cachifyObject(cacheManager, businessModel, cacheableMethodsMap, options);\n}\n\n// Keep the cachification call near our 'getBusinessModel' utility function\n// and maybe with some explanatory comment block in order for someone new\n// to easily figure out what is going on.\ncachifyBusinesModel(BusinessModel.prototype);\n\n// Make sure that you mention in the comment block here that the result \n// is cachified and point out to the reader to the correct direction in order \n// to find more details about it. \nfunction getBusinessModel() {\n  const businessModel = new BusinessModel();\n  \n  // Do some initialization here...\n\n  return businessModel; // Our businessModel instance is now cachified!\n}\n")),(0,i.kt)("p",null,"A few things I would like to note here for the code above:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"We have implemented a ",(0,i.kt)("inlineCode",{parentName:"li"},"cachifyBusinesModel")," function in which we will be cachifying the ",(0,i.kt)("inlineCode",{parentName:"li"},"businessModel")," Object we pass as an argument. A ",(0,i.kt)("inlineCode",{parentName:"li"},"map")," named ",(0,i.kt)("inlineCode",{parentName:"li"},"cacheableMethodsMap")," contains all the methods that we want to cachify and it will be passed along with some other options (like the cache key) to our ",(0,i.kt)("inlineCode",{parentName:"li"},"cachifyObject")," function."),(0,i.kt)("li",{parentName:"ol"},"We initializate a ",(0,i.kt)("inlineCode",{parentName:"li"},"CacheManager")," instance which we will pass to our cachifyObject function as well. The options of the ",(0,i.kt)("inlineCode",{parentName:"li"},"CacheManager")," are not important. What is important is how we get the redis instance. As you have noticed we use a ",(0,i.kt)("inlineCode",{parentName:"li"},"getRedisSingletonInstance")," function which basically returns a global instance of redis that will be instantiated the first time the function is called. For every other call, the existing instance will be returned. This is important in order to avoid any code bottleneck by instantiating redis again and again everytime ",(0,i.kt)("inlineCode",{parentName:"li"},"cachifyBusinesModel")," function is called. If we wrap the prototype, as we do in the example above, then it shouldn\u2019t be a problem since it will only be called once. But if you go with the alternative approach (described in the next section) which wraps the instantiated object instead, then it will definitely be an issue."),(0,i.kt)("li",{parentName:"ol"},"Make sure that you comment on everything in your code in order for the caller of the ",(0,i.kt)("inlineCode",{parentName:"li"},"getBusinessModel")," to know exactly where he is getting into.")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Instead of implementing ",(0,i.kt)("inlineCode",{parentName:"p"},"getRedisSingletonInstance")," to handle the singleton, you could use a ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/typedi"},"container")," approach."))),(0,i.kt)("h3",{id:"to-prototype-or-not-to-prototype"},"To ",(0,i.kt)("inlineCode",{parentName:"h3"},"prototype")," or not to ",(0,i.kt)("inlineCode",{parentName:"h3"},"prototype")),(0,i.kt)("p",null,"I have mentioned earlier the use of a utility function, ",(0,i.kt)("inlineCode",{parentName:"p"},"getBusinessModel")," in which the ",(0,i.kt)("inlineCode",{parentName:"p"},"BussinessModel")," is instantiated and initialized there. The reason that I did mention this function is because I want to point out that wrapping the ",(0,i.kt)("inlineCode",{parentName:"p"},"prototype")," has a trade-off; code obscurity."),(0,i.kt)("p",null,"A new guy might miss the fact that ",(0,i.kt)("em",{parentName:"p"},"some")," of the object methods he uses return a cached version of the result. One might say that we can add a suffix to those methods (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"findItemsWithCache"),") instead of overwriting the originals. Except that I find this ugly, you will also not be able to easily disable the cache in case you want to do some debugging without it. By keeping the original names, you can just turn off cachification in case you want to run the code without the cache and just let it do its thing without the hassle of changing method names as well."),(0,i.kt)("p",null,"Another small problem with the wrapping of the ",(0,i.kt)("inlineCode",{parentName:"p"},"prototype")," is when we need to dynamically build our cache key prefix. If we want to use variables that are not within the object we are wrapping (which we can access them via this if we use a function as a ",(0,i.kt)("inlineCode",{parentName:"p"},"keyPrefix")," getter) and we can not know their values beforehand, then we simply can\u2019t do it. To be fair here, we are doing some complex caching ourselves and we haven\u2019t bumped in such a case but it\u2019s definitely a possibility."),(0,i.kt)("p",null,"A possible alternative, as you can see in the code example below, is to do the wrapping every time the ",(0,i.kt)("inlineCode",{parentName:"p"},"BusinessModel")," is instantiated:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Alternative version with cachifying the instantiated object. \n// No obscurity with this version; just 'useCache' a flag that the caller \n// decides if it should be true or false. The new guy will be happier.\nfunction getBusinessModel({useCache = true} = {}) {\n  const businessModel = new BusinessModel();\n  \n  // Do some initialization here...\n\n  if (useCache) {\n    return cachifyBusinessModel(businessModel);\n  } else {\n    return businessModel;\n  }\n}\n")),(0,i.kt)("p",null,"However, if you have a large amount of objects that you are instantiating, you will definitely benefit from wrapping the ",(0,i.kt)("inlineCode",{parentName:"p"},"prototype")," ",(0,i.kt)("em",{parentName:"p"},"once")," instead of wrapping each instantiated object as it might become a bottleneck for your code."),(0,i.kt)("p",null,"If you have a very small amount of objects that you are instantiating, it might be better to use the alternative version of ",(0,i.kt)("inlineCode",{parentName:"p"},"getBusinessModel")," from above which will also be doing the cachification. The advantage of going with this approach, even if there is a slight \u2013 almost insignificant probably \u2013 performance penalty, the code will be much less obscured. The new guy will just need to read the documentation of the function and immediately will figure out what is going on without getting crazy first!"),(0,i.kt)("h3",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"We saw that with the use of a couple of functions, we can easily add caching to expensive ",(0,i.kt)("inlineCode",{parentName:"p"},"Object")," methods that we use often with minimum effort. Depending on our use case, and if our code is modular enough, we can achieve the same result in more than one way. I hope that I gave you some idea of how to approach this and maybe you can find improvements while you are at it. If you do, I would love to hear about them!"))}p.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4031],{3905:function(e,t,o){o.d(t,{Zo:function(){return p},kt:function(){return d}});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var i=n.createContext({}),c=function(e){var t=n.useContext(i),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},p=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(o),d=r,h=u["".concat(i,".").concat(d)]||u[d]||m[d]||a;return o?n.createElement(h,s(s({ref:t},p),{},{components:o})):n.createElement(h,s({ref:t},p))}));function d(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,s=new Array(a);s[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var c=2;c<a;c++)s[c]=o[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,o)}u.displayName="MDXCreateElement"},9345:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return c},toc:function(){return p},default:function(){return u}});var n=o(7462),r=o(3366),a=(o(7294),o(3905)),s=["components"],l={slug:"node-js-fork-is-slow-deal-with-it",title:"Node.js fork is slow; Deal with it",date:new Date("2021-09-27T00:00:00.000Z"),description:"Dealing with Node.js fork slowness",author:"Alexander Lolis",author_url:"https://github.com/alolis",author_image_url:"https://avatars.githubusercontent.com/u/82233?v=4",tags:["development","battlefield","nodejs","javascript","no_silver_bullet"]},i=void 0,c={permalink:"/node-js-fork-is-slow-deal-with-it",source:"@site/blog/node-js-fork-is-slow-deal-with-it.md",title:"Node.js fork is slow; Deal with it",description:"Dealing with Node.js fork slowness",date:"2021-09-27T00:00:00.000Z",formattedDate:"September 27, 2021",tags:[{label:"development",permalink:"/tags/development"},{label:"battlefield",permalink:"/tags/battlefield"},{label:"nodejs",permalink:"/tags/nodejs"},{label:"javascript",permalink:"/tags/javascript"},{label:"no_silver_bullet",permalink:"/tags/no-silver-bullet"}],readingTime:4.81,truncated:!0,prevItem:{title:"Welcome 2022!",permalink:"/welcome-2022"},nextItem:{title:"Riding the bull; the npm package, that is",permalink:"/riding-the-bull"}},p=[{value:"Approach",id:"approach",children:[]},{value:"Conclusion",id:"conclusion",children:[]}],m={toc:p};function u(e){var t=e.components,o=(0,r.Z)(e,s);return(0,a.kt)("wrapper",(0,n.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Yes. I know. Forking a process in ",(0,a.kt)("inlineCode",{parentName:"p"},"Node.js")," is slow. Instead of crying about it, let's see how we can handle it!"),(0,a.kt)("p",null,"Let's assume that you have a service in which you:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Accept a request"),(0,a.kt)("li",{parentName:"ol"},"Fork a process with ",(0,a.kt)("a",{parentName:"li",href:"https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options"},(0,a.kt)("inlineCode",{parentName:"a"},"child_process.fork"))),(0,a.kt)("li",{parentName:"ol"},"Execute some code within that process"),(0,a.kt)("li",{parentName:"ol"},"Exit from the child process"),(0,a.kt)("li",{parentName:"ol"},"Complete the request")),(0,a.kt)("p",null,"Probably the first thing you tried was to receive the request, spin up a process, do whatever you need in the processor, and exit. You timed the whole thing and your jaw dropped that it took a million years for the request to complete, even if you are just doing a ",(0,a.kt)("inlineCode",{parentName:"p"},"console.log('I love kittens')")," inside your processor. "),(0,a.kt)("p",null,"Don't bother. I will tell you right now that the bottleneck is the forking."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},'"',(0,a.kt)("strong",{parentName:"p"},"OUTRAGEOUS!")," I should have used ",(0,a.kt)("em",{parentName:"p"},"{INSERT_OTHER_TECH_HERE}")," which is super awesomely fast and all the cool kids are using it! Some random dude on medium.com says it is true!"),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("em",{parentName:"p"},"-- your loud voice"))),(0,a.kt)("p",null,"Well, instead of re-writting the whole thing in a different language, I have an alternative for you; ",(0,a.kt)("strong",{parentName:"p"},"use a pool of forked child processes.\n")),(0,a.kt)("h2",{id:"approach"},"Approach"),(0,a.kt)("p",null,"The idea is straightforward; Upon service initialization, fork a bunch of processes, and whenever a request comes in, get a resource (a child process) from the pool and use ",(0,a.kt)("inlineCode",{parentName:"p"},"IPC")," communication to send commands to it. After the processor completes, return it to the pool. "),(0,a.kt)("p",null,"The first thing for all this of course, is a pool. The good news is that there is no need to implement your own, you can just use this lovely ",(0,a.kt)("inlineCode",{parentName:"p"},"npm")," package, ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/generic-pool"},"generic-pool"),", or the native ",(0,a.kt)("a",{parentName:"p",href:"https://nodejs.org/api/cluster.html"},"cluster")," module depending on your use case."),(0,a.kt)("p",null,"For this post, I will use ",(0,a.kt)("inlineCode",{parentName:"p"},"generic-pool")," so lets start with the processors pool which will look something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="pool.js"',title:'"pool.js"'},"import {fork} from 'child_process';\nimport GenericPool from 'generic-pool';\nimport logger from '/your/logger';\n\nconst commandProcessorsPool = GenericPool.createPool({\n  create: () => {\n    const modulePath = path.join(__dirname, 'processor.js');\n    const commandProcessor = fork(modulePath);\n\n    logger.debug(`Forked command processor with pid ${commandProcessor.pid}`);\n\n    return commandProcessor;\n  },\n  destroy: (commandProcessor) => {\n    logger.debug(`Destroying command processor with pid ${commandProcessor.pid}`);\n\n    commandProcessor.removeAllListeners();\n    commandProcessor.kill('SIGKILL');\n  },\n  validate: commandProcessor => commandProcessor.connected && !commandProcessor.killed\n}, {\n  testOnBorrow: true,\n  min: 2, // Depending on your load, set a MINIMUM number of processes that should always be available in the pool\n  max: 5 // Depending on your load, set a MAXIMUM number of processes that should always be available in the pool\n});\n\ncommandProcessorsPool.on('factoryCreateError', logger.debug);\ncommandProcessorsPool.on('factoryDestroyError', logger.debug);\n")),(0,a.kt)("p",null,"And of course, you will also need to implement the actual processor which looks like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="processor.js"',title:'"processor.js"'},"import {serializeError} from 'serialize-error';\nimport logger from '/your/logger';\nimport {MESSAGE_STATUS} from './pool.js';\n\nprocess.on('message', async (message) => {\n  try {\n    // Read and validate input data from `message` and do whatever you need to do...\n    const {name} = message;\n    const result = await petKitten(name);\n    \n    // All went well, send the result of your function to the parent process...\n    process.send({status: MESSAGE_STATUS.OK, data: result});\n  } catch (e) {\n    logger.debug(e);\n\n    /* \n      In the real world, your processor will probably need to handle errors as well and pass those errors to\n      the parent process. Unfortunately, sending `Error` instances via `IPC` is not possible, BUT, we can just\n      serialize them and then deserialize them on the parent process!\n    */\n    process.send({status: MESSAGE_STATUS.ERROR, data: serializeError(e)});\n  }\n};\n")),(0,a.kt)("p",null,"Going back to our pool implementation, the only thing left now is the function that will be executing our commands:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="pool.js"',title:'"pool.js"'},"// ... omitted previous code for succinctness\n\nimport {deserializeError} from 'serialize-error';\n\nconst MESSAGE_STATUS = {\n  OK: 'ok',\n  ERROR: 'error',\n};\n  \nasync function executeCommand(params) {\n  const commandProcessor = await commandProcessorsPool.acquire();\n  \n  try {\n    const commandProcessorTask = () => {\n      return new Promise((resolve, reject) => {\n        // https://nodejs.org/api/child_process.html#child_process_event_error\n        commandProcessor.on('error', reject);\n\n        commandProcessor.on('message', (message) => {\n          const {status, data} = message;\n\n          const handlersMap = {\n            [MESSAGE_STATUS.OK]: () => resolve(data),\n            \n            // Don't forget to deserialize the error first!\n            [MESSAGE_STATUS.ERROR]: () => reject(deserializeProcessorError(data)           \n          };\n\n          const handler = handlersMap[status];\n\n          if (!handler) {\n            return reject(new Error(`Unknown command processor message status '${status}'`));\n          }\n\n          handler();\n        });\n\n        commandProcessor.send(params);\n      });\n    };\n    \n    const result = await commandProcessorTask();\n    \n    return result;\n  } finally {\n    // Make sure that the command processor is returned to the pool no matter what happened\n    await commandProcessorsPool.release(commandProcessor);\n  }\n}\n\nexport {\n  MESSAGE_STATUS,\n  executeCommand\n}\n")),(0,a.kt)("p",null,"For the shake of this example, I am going to assume that you are using ",(0,a.kt)("inlineCode",{parentName:"p"},"express.js"),". The following is a very simple and short snippet on how to bring everything together, and execute a command when a request is received:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="express.js"',title:'"express.js"'},"import express from 'express';\nimport {executeCommand} from './pool.js'; // By importing the file, our pool will be initialized\nimport logger '/your/logger';\n\nconst app = express();\n\napp.post('/pet_kitten', (req, res) => {\n  const {name} = req.body;\n  \n  // If this is a long-running process, then we shouldn't really block the request by using await.\n  // Depending on your case here, you might want to handle the actual command execution differently.\n  executeCommand({name}).catch(logger.error);\n\n  res.status(202); // HTTP Status Accepted\n  res.json({message: `Petting ${name} is underway...`});\n\napp.listen(3000, () => {\n  logger.info(`kitten app listening at http://localhost:${port}`)\n})\n")),(0,a.kt)("h2",{id:"conclusion"},"Conclusion"),(0,a.kt)("p",null,"Although the above was a simple real world example on how to use a pool of processes, it can be the basis for more advanced usage. For example each processor can be modified to accept various commands instead of being limited to just one function. You could also add an ",(0,a.kt)("inlineCode",{parentName:"p"},"onMessage")," event handler to support commands that send updates while they are being executed. I will leave those for another blog post! "),(0,a.kt)("p",null,"Depending on your use case though, you can do a lot of different things by expanding the approach I have just described. "),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"The important thing here is to remember that most of the time, the problem is not the tool, it's your attitude towards the tool. Be creative and solve shit.")))}u.isMDXComponent=!0}}]);
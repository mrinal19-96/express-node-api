Core Node.js Questions
======================

1.What is the difference between require() and import?

=>1. require() – CommonJS (CJS)
Used in Node.js (default) module system

Synchronous — loads modules at runtime

Works in all versions of Node.js by default

2. import – ES Modules (ESM)
Part of ECMAScript (ES6+) standard

Asynchronous — resolved before code runs

Needs "type": "module" in package.json, or .mjs file extension in Node.js



2.What is the event loop? How does it work in Node.js?

=> The event loop is the core mechanism that enables non-blocking, asynchronous execution in Node.js — even though JavaScript is single-threaded.

It allows Node.js to handle multiple tasks concurrently (like file I/O, HTTP requests) without blocking the main thread.


How the Event Loop Works
-----------------------
The event loop continually checks for tasks to execute from different queues (phases), such as:

Timers Queue — Executes callbacks from setTimeout() and setInterval()

Pending Callbacks — I/O callbacks deferred to the next loop

Idle, Prepare — Internal use

Poll Phase — Retrieves new I/O events (e.g., data from file, network)

Check Phase — Executes setImmediate() callbacks

Close Callbacks — e.g., socket.on('close', ...)

Between each phase, microtasks like Promise.then() or process.nextTick() are executed.



3.Explain the concept of the call stack, event queue, and thread pool in Node.js.

4.What are global objects in Node.js? Name a few.

5.What is the difference between synchronous and asynchronous code in Node.js?

6.What is the difference between process.nextTick(), setImmediate(), and setTimeout()?

7.What is the purpose of package.json? What are dependencies vs devDependencies?

8.What is the use of the Buffer class?

9.How is Node.js different from traditional server-side platforms like PHP or Java?

10.How do you handle file operations in Node.js?

Asynchronous Programming
===========================
11.Explain callbacks, promises, and async/await.

12.How would you handle multiple asynchronous operations (e.g., Promise.all, Promise.race)?

13.What is callback hell and how can you avoid it?

14.Explain the difference between await Promise.all() and await in a loop.

 Express.js & REST APIs
========================

15.What is middleware in Express.js?

16.How do you handle error handling in Express?

17.How do you implement JWT authentication?

18.What is the difference between PUT and PATCH in REST?

19.How do you structure a scalable Node.js API project?


 Database Integration
-====================
20.How do you connect MongoDB/MySQL with Node.js?

21.How do you prevent NoSQL injection or SQL injection?

22.Difference between populate() in Mongoose and JOIN in SQL?

23.How do you handle database connection pooling?

 Security & Best Practices
=========================
24.What are common security threats in Node.js apps? How to prevent them?

25.XSS, CSRF, SQL Injection

26.How do you use helmet and cors in Express?

27.How to securely store environment variables (API keys, DB cr


Performance & Optimization
========================
28.How do you improve the performance of a Node.js application?

29.Caching, clustering, load balancing

30.What is clustering in Node.js? How do you use the cluster module?

31.How would you handle large file uploads/downloads in Node.js?

32.How do you debug a memory leak in Node.js?

DevOps & Tooling
==================
33.What is nodemon?

34.How do you create and use environment-specific configurations?

35.What is PM2? How do you use it in production?

36.Explain how you would deploy a Node.js app on AWS or another cloud provider.

Package Management
================
37.What is the difference between npm install and npm ci?

38.What is a package-lock.json file?

39.How do you create and publish your own NPM package?

40.npm and yarn deffrence

Advanced/Scenario-Based
===========================
41.Design a rate limiter middleware.

42.How would you handle 1 million concurrent requests in a Node.js API?

43.How do you ensure transactional integrity in a Node.js microservice with a DB?

44.What is your approach to writing unit/integration tests in Node.js?

Behavioral/Project Questions
============================

45.What challenges did you face in your Node.js project, and how did you solve them?

46.Have you worked with microservices in Node.js? How did you manage communication?

47.Explain a real-time system you’ve built (e.g., using WebSockets or Socket.IO).

48.How do you structure large-scale Node.js applications?

49. Localization in node js ?

50. how to debug code in node js ?

51. mongodb indexing ?

52. $lookup 

53. what are the aggregate function in mongodb ? 

54. What is an Indexing MySQL ?

Testing in Node.js
===================
55.What tools do you use? (e.g., Jest, Mocha, Supertest)

56.Difference between unit tests, integration tests, and E2E

57.How do you mock database calls?

Monitoring & Logging
=====================
58.How do you log errors in Node.js?

59.Tools: winston, morgan, log4js

60.How to integrate with tools like ELK, DataDog, or Prometheus

Edge Case Questions (Bonus)
==========================
61.How do you prevent a memory leak in a long-running app?

62.What happens if two requests update the same record at the same time?

63.How do you implement graceful shutdown for Node.js apps?

























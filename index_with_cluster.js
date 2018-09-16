process.env.UV_THREADPOOL_SIZE = 1; //Each children gets 1 thread in their thread pool
const cluster = require('cluster');

if (cluster.isMaster) {
  // Rule of thumb to get most quick response Number of phusical core == child
  cluster.fork();
  cluster.fork();
} else {
  //child is going to act like a server and execute the following code
  const express = require('express');
  const app = express();
  
  function doWork(duration) {
    const start = Date.now();
    
    while(Date.now() - start < duration){}
  }
  
  app.get('/', (req, res) => {
    res.send('Hi there');
  });
  
  app.listen(3030);
}
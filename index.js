const express = require("express");
const app = express();
const Worker = require("webworker-threads").Worker;

const worker = new Worker(function() {
  postMessage("Started the task");
  this.onmessage = function() {
    let counter = 0;
    while (counter < 1e9) {
      counter++;
    }
    postMessage(counter);
    self.close();
  };
});

const fibo = new Worker(function() {
  function fibo (n) {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
  }
  this.onmessage = function (event) {
    postMessage(fibo(event.data));
  }
});


app.get("/", (req, res) => {
  worker.onmessage = function({data}) {
    console.log("Worker said : " + data);
  };
  worker.postMessage();

  res.send("Hi there");
});

app.get("/fib", (req, res) => {
  fibo.onmessage = function ({data}) {
    res.end('fib(40) = ' + data);
  };
  fibo.postMessage(40);
})

app.listen(3030);

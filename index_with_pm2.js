// pm2 start index.js -i 0 
// (0 means I don't know figure it out for me, pm2 will choose cluster number equal number of logical core)
// ex: corei7 4 core 8 thread - cluster will be 8
const express = require("express");
const app = express();

function doWork(duration) {
  const start = Date.now();

  while (Date.now() - start < duration) {}
}

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3030);

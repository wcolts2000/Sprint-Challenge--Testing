const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(200);
});

server.get("/games", (req, res) => {
  res.send(200);
});

module.exports = server;

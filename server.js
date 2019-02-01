const express = require("express");

const server = express();

const games = [];

server.use(express.json());

server.get("/", (req, res) => {
  res.sendStatus(200);
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;

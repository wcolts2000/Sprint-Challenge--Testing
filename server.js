const express = require("express");

const server = express();

const games = [];
let counter = 0;

server.use(express.json());

server.get("/", (req, res) => {
  res.sendStatus(200);
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  const { title, genre } = req.body;
  const gameToAdd = {
    id: counter++,
    title,
    genre
  };

  games.push(gameToAdd);
  res.status(201).json(gameToAdd);
});
module.exports = server;

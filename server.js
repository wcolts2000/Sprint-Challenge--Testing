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
  if (!title || !genre)
    res
      .status(422)
      .json({ message: "must provide both title and genre to post a game" });
  const gameToAdd = {
    id: counter++,
    title,
    genre
  };

  games.push(gameToAdd);
  res.status(201).json(gameToAdd);
});
module.exports = server;

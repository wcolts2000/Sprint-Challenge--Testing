const express = require("express");

const server = express();

const games = [
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  }
];

server.use(express.json());

server.get("/", (req, res) => {
  res.sendStatus(200);
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;

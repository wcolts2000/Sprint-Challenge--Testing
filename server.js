const express = require("express");

const server = express();

const games = [];
let counter = 0;

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "running" });
});

server.get("/games", (req, res) => {
  res.json(games);
});

server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  const foundGame = games.find(game => game.id === Number(id));
  if (!foundGame) return res.status(404).json({ message: "Game not found" });
  res.json(foundGame);
});

server.post("/games", (req, res) => {
  const { title, genre } = req.body;

  if (games.some(game => game.title.toLowerCase() === title.toLowerCase()))
    return res.status(405).json({ message: "game already exists in db" });

  if (!title || !genre)
    res.status(422).json({
      message:
        "must provide both title and genre to post a game, releaseYear is an optional field"
    });
  const gameToAdd = {
    id: counter++,
    title,
    genre
  };

  games.push(gameToAdd);
  res.status(201).json(gameToAdd);
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  const foundGame = games.find(game => game.id === Number(id));
  console.log("GAMES", games);

  if (!foundGame) return res.status(404).json({ message: "Game not found" });
  let deletedGame = games.pop(foundGame);
  console.log("GAMES", games);
  res.json(deletedGame);
});

module.exports = server;

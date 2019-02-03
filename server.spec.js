const request = require("supertest");
const server = require("./server");
// server.use(express.json());

describe("SERVER: server.js", () => {
  describe("GET to / endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
  describe("GET to /games endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });
    it("should content type to be JSON", async () => {
      let res = await request(server).get("/games");

      expect(res.type).toMatch(/json/i);
    });
    it("should send back an empty array if nothing is in the db", async () => {
      let res = await request(server).get("/games");

      expect(JSON.parse(res.text)).toEqual([]);
    });
  });
  describe("POST to /games endpoint", () => {
    it("should insert the user provided game into the games db", async () => {
      const game = await request(server)
        .post("/games")
        .send({
          title: "Pacman",
          genre: "arcade",
          releaseYear: 1980
        });

      const games = await request(server).get("/games");
      let obj = JSON.parse(games.text);

      expect(obj).toHaveLength(1);
      expect(game.status).toBe(201);
    });
    it("should respond with a status code of 422 if the information sent is incomplete", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "pacman collectors", genre: "" });
      expect(res.status).toBe(422);
    });
    it("should send back an object matching the sent information with an id appended to it", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "ms pacman", genre: "arcade" });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        id: 2,
        title: "ms pacman",
        genre: "arcade"
      });
    });
    it("should send back status code of 405 if they try in input a game title {case insensitive} that already exists in the db", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "arcade" });
      expect(res.status).toBe(405);
    });
  });
  describe("GET to /games/:id", () => {
    it("should return the specified game if found", async () => {
      const game = await request(server).get("/games/1");
      expect(game.status).toBe(200);
    });
    it("should return a status code of 404 if the passed id doesnt exist in db", async () => {
      const game = await request(server).get("/games/5");
      expect(game.status).toBe(404);
    });
  });
  describe("DELETE to /games/:id", () => {
    it("should return the number of deleted entries", async () => {
      const game = await request(server).delete("/games/1");

      expect(game.text).toBeTruthy();
    });
    it("should return a status code of 404 if the passed id doesn't exist in db", async () => {
      const game = await request(server).delete("/games/5");
      expect(game.status).toBe(404);
    });
  });
});

const request = require("supertest");
const server = require("./server");

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
        .send({ title: "Pacman", genre: "" });
      expect(res.status).toBe(422);
    });
  });
});

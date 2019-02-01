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
      console.log(res.data);

      expect(res.type).toMatch(/json/i);
    });
  });
});

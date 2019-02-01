const request = require("supertest");
const server = require("./server");

describe("SERVER: server.js", () => {
  describe("GET to / endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
});

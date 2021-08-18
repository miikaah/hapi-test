import { app } from "../jestSetup";

describe("API", () => {
  describe("GET /name/{name}", () => {
    it("should return 400 when name is too long", async () => {
      await app.get("/name/foofoofoofoo").expect(400);
    });

    it("should return 200 when it works", async () => {
      await app.get("/name/foo").expect(200);
    });
  });
});

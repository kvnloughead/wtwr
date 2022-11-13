const supertest = require("supertest");
const { app } = require("./setup");

describe("GET routes without authorization", () => {
  ["/", "/badpath"].forEach((path) => {
    it(`GET ${path} should return 404`, async () => {
      await supertest(app)
        .get(path)
        .expect(404)
        .then((response) => {
          expect(response.body).toMatchObject({
            message: "Requested resource not found",
          });
        });
    });
  });

  ["/users"].forEach((path) => {
    it(`GET ${path} should return 401 missing authorization`, async () => {
      await supertest(app)
        .get(path)
        .expect(401)
        .then((response) => {
          expect(response.body).toMatchObject({
            message: "Invalid credentials",
          });
        });
    });
  });

  ["/items"].forEach((path) => {
    it(`GET ${path} should return 200`, async () => {
      await supertest(app)
        .get(path)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toBe(0);
        });
    });
  });
});

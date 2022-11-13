const supertest = require("supertest");
const mongoose = require("mongoose");

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/wtwr_db_test_server",
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
});

const createServer = require("../server");
const app = createServer();

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

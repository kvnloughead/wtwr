const mongoose = require("mongoose");
const supertest = require("supertest");

const createServer = require("../server");
const User = require("../models/user");
const ClothingItem = require("../models/clothingItem");
const { DEFAULT_USER, TEST_USER } = require("../utils/constants");
const { BAD_USERS } = require("./constants");

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/wtwr_db_test",
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
});

const app = createServer();

describe("create user", () => {
  it("should create a user with valid email and password", async () => {
    await supertest(app)
      .post("/signup")
      .send({
        email: TEST_USER.email,
        password: TEST_USER.password,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject({
          name: DEFAULT_USER.name,
          avatar: DEFAULT_USER.avatar,
          email: TEST_USER.email,
        });
        expect(response.body).toHaveProperty("password");
        expect(response.body).toHaveProperty("_id");
      });
  });

  it("should return 400 if the data is invalid", async () => {
    BAD_USERS.forEach(async (badUser) => {
      await supertest(app)
        .post("/signup")
        .send(badUser)
        .expect(400)
        .then((response) => {
          expect(response.body).toMatchObject({
            message: "Invalid request",
          });
        });
    });
  });

  it("should return 409 if the email is taken", async () => {
    await User.create(TEST_USER);
    await supertest(app)
      .post("/signup")
      .send(TEST_USER)
      .expect(409)
      .then((response) => {
        expect(response.body).toMatchObject({
          message: "Email already in use",
        });
      });
  });
});

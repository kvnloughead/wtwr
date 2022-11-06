const mongoose = require("mongoose");
const supertest = require("supertest");

const createServer = require("../server");
const User = require("../models/user");
const ClothingItem = require("../models/clothingItem");
const { DEFAULT_USER, TEST_USER } = require("../utils/constants");

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
  it("should create a user with default name", async () => {
    const user = await User.create({
      email: "test-user@testing.com",
      password: "password",
    });
    const found = await User.findOne({ email: "test-user@testing.com" });
    expect(found.name).toBe(DEFAULT_USER.name);
    expect(found.avatar).toBe(DEFAULT_USER.avatar);
  });

  it("should create a user with valid parameters", async () => {
    const user = await User.create(TEST_USER);
    const found = await User.findOne({ email: "test-user@testing.com" });
    expect(found.name).toBe(TEST_USER.name);
    expect(found.avatar).toBe(TEST_USER.avatar);
  });

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
});

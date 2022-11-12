const mongoose = require("mongoose");
const supertest = require("supertest");

const createServer = require("../server");
const User = require("../models/user");
const ClothingItem = require("../models/clothingItem");
const { DEFAULT_USER, TEST_USER } = require("../utils/constants");
const {
  INVALID_CREDENTIALS,
  INVALID_USERS,
  TEST_ITEM,
  UNAUTHORIZED_TOKENS,
  FORBIDDEN_TOKENS,
} = require("./constants");

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

/**
 *
 * @param data - user's signin credentials
 * @param data.email - user's email
 * @param data.password - user's password
 * @returns object containing the user object and the token return by the API
 */
const loginUser = async (data) => {
  const user = await supertest(app).post("/signup").send(data);
  const login = await supertest(app).post("/signin").send(data);
  return { user, token: login._body.token };
};

describe("POST /signup", () => {
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
    INVALID_USERS.forEach(async (badUser) => {
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
    await supertest(app).post("/signup").send(TEST_USER);
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

describe("POST /signin", () => {
  it("should log a user in with valid email and password", async () => {
    await supertest(app).post("/signup").send(TEST_USER);
    await supertest(app)
      .post("/signin")
      .send(TEST_USER)
      .then((response) => {
        expect(response.body).toHaveProperty("token");
      });
  });

  it("should return 401 if credentials are invalid", async () => {
    INVALID_CREDENTIALS.forEach(async (unauthorizedLogin) => {
      await supertest(app)
        .post("/signin")
        .send(unauthorizedLogin)
        .expect(401)
        .then((response) => {
          expect(response.body).toMatchObject({
            message: "Incorrect email or password",
          });
        });
    });
  });

  describe("POST /items", () => {
    it("should allow item creation if the user is authorized", async () => {
      const user = await supertest(app).post("/signup").send(TEST_USER);
      const login = await supertest(app).post("/signin").send(TEST_USER);
      const { _id } = user._body;
      const { token } = login._body;
      await supertest(app)
        .post("/items")
        .set("authorization", `Bearer ${token}`)
        .send({ ...TEST_ITEM, owner: _id })
        .expect(201)
        .then((response) => {
          expect(response.body).toMatchObject({ ...TEST_ITEM, owner: _id });
          expect(response.body.likes.length).toBe(0);
          expect(response.body).toHaveProperty("createdAt");
          expect(response.body).toHaveProperty("_id");
        });
    });
  });
});

describe("GET /users/me", () => {
  it("should return current user's info if user is logged in", async () => {
    const { user, token } = await loginUser(TEST_USER);
    await supertest(app)
      .get("/users/me")
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toBe(TEST_USER.email);
        expect(response.body.name).toBe(TEST_USER.name);
        expect(response.body.avatar).toBe(TEST_USER.avatar);
        expect(response.body._id).toBe(user._body._id);
        expect(response.body).not.toHaveProperty("password");
      });
  });

  it("should return 401 if credentials are malformed", async () => {
    UNAUTHORIZED_TOKENS.forEach(async (token) => {
      await supertest(app)
        .get("/users/me")
        .set("authorization", token)
        .expect(401)
        .then((response) => {
          expect(response.body).toHaveProperty("message");
        });
    });
  });

  it("should return 403 if credentials are invalid", async () => {
    FORBIDDEN_TOKENS.forEach(async (token) => {
      await supertest(app)
        .get("/users/me")
        .set("authorization", token)
        .expect(403)
        .then((response) => {
          expect(response.body).toHaveProperty("message");
        });
    });
  });
});

describe("PUT /users/me", () => {
  it("should update if data is valid", async () => {
    const { user, token } = await loginUser(TEST_USER);
    await supertest(app)
      .patch("/users/me")
      .send({ name: "new name" })
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toBe(TEST_USER.email);
        expect(response.body.avatar).toBe(TEST_USER.avatar);
        expect(response.body._id).toBe(user._body._id);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.name).toBe("new name");
      });
  });

  it("should not update if data isn't valid", async () => {
    const { token } = await loginUser(TEST_USER);
    [{ email: "foo" }, { name: "" }, { avatar: "bad-url" }].forEach(
      async (badUpdate) => {
        await supertest(app)
          .patch("/users/me")
          .send(badUpdate)
          .set("authorization", `Bearer ${token}`)
          .expect(400)
          .then((response) => {
            expect(response.body).toHaveProperty("message");
          });
      }
    );
  });
});

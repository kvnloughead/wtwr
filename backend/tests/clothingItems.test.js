const supertest = require("supertest");
const mongoose = require("mongoose");

const { loginUser, createItem } = require("./helpers");
const {
  TEST_USER,
  OTHER_USER,
  TEST_ITEM,
  INVALID_ITEMS,
} = require("./constants");

const createServer = require("../server");
const app = createServer();

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/wtwr_db_test_clothing",
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
});

describe("POST /items", () => {
  it("should allow item creation if the user is authorized", async () => {
    const { _id, token } = await loginUser(app, TEST_USER);
    await createItem(app, { _id, token, body: TEST_ITEM }).then((response) => {
      expect(response.body).toMatchObject({ ...TEST_ITEM, owner: _id });
      expect(response.body.likes.length).toBe(0);
      expect(response.body).toHaveProperty("createdAt");
      expect(response.body).toHaveProperty("_id");
    });
  });

  INVALID_ITEMS.forEach((item) => {
    it(`should return 400 for ${JSON.stringify(item)}`, async () => {
      const { _id, token } = await loginUser(app, TEST_USER);
      await supertest(app)
        .post("/items")
        .set("authorization", `Bearer ${token}`)
        .send({ ...item, owner: _id })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Invalid request");
        });
    });
  });
});

describe("DELETE /item/:itemId", () => {
  it("should allow deletion of existing item", async () => {
    const { _id, token } = await loginUser(app, TEST_USER);
    const newItem = await supertest(app)
      .post("/items")
      .set("authorization", `Bearer ${token}`)
      .send({ ...TEST_ITEM, owner: _id });
    const _itemId = newItem._body._id;

    await supertest(app)
      .delete(`/items/${_itemId}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.deletedCount).toBe(1);
      });
  });

  it("should return 404 if no such item", async () => {
    const { token } = await loginUser(app, TEST_USER);
    const item = await createItem(app, { token });
    await supertest(app)
      .delete(`/items/636eee3ae14708b0c35f62cc`)
      .set("authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Requested resource not found");
      });
  });

  it("should return 403 if user doesn't own card", async () => {
    const { _id, token } = await loginUser(app, TEST_USER);
    const item = await createItem(app, { _id, token, body: TEST_ITEM });
    const otherUser = await loginUser(app, OTHER_USER);
    await supertest(app)
      .delete(`/items/${item._body._id}`)
      .set("authorization", `Bearer ${otherUser.token}`)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe("Authorization required");
      });
  });
});

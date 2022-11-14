const supertest = require("supertest");

/**
 * @param app - the testing environment express app
 * @param data - user's signin credentials
 * @param data.email - user's email
 * @param data.password - user's password
 * @returns object containing the user object and the token return by the API
 */
const loginUser = async (app, data) => {
  const user = await supertest(app).post("/signup").send(data);
  const login = await supertest(app).post("/signin").send(data);
  const { _id } = user._body;
  return { _id, user, token: login._body.token };
};

/**
 *
 * @param app - the testing environment express app
 * @param {object} data - data for the request
 * @param data.token - the user's JWT token
 * @param data._id - the user's _id
 * @param {object} body - data for the body of the request
 * @returns an unresolved supertest promise
 */
const createItem = async (app, data) =>
  supertest(app)
    .post("/items")
    .set("authorization", `Bearer ${data.token}`)
    .send({ ...data.body, owner: data._id });

module.exports = { loginUser, createItem };

const express = require("express");
const cors = require("cors");
require("express-async-errors");

const { getItems } = require("./controllers/clothingItems");

const { createUser, login } = require("./controllers/users");
const { handleError } = require("./middleware/error-handler");
const { NotFoundError } = require("./utils/errors");
const routes = require("./routes");

function createServer() {
  const app = express();
  app.options("*", cors());
  app.use(cors());

  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });

  app.post("/signup", createUser);
  app.post("/signin", login);
  app.get("/items", getItems);

  app.use("/", routes);

  app.use("/", () => {
    throw new NotFoundError();
  });

  app.use(handleError);
  return app;
}

module.exports = createServer;

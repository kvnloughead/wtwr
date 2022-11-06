const express = require("express");

const { createUser, login } = require("./controllers/users");
const handleError = require("./middleware/error-handler");
const NotFoundError = require("./utils/errors/NotFoundError");

function createServer() {
  const app = express();
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    req.user = {
      _id: "635b1da3e2bde2e21b6ef4cf",
    };
    next();
  });

  app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });

  app.post("/signup", createUser);
  app.post("/signin", login);

  app.use("/", require("./routes"));

  app.use("/", (req, res) => {
    throw new NotFoundError();
  });

  app.use(handleError);
  return app;
}

module.exports = createServer;

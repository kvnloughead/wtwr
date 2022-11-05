const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SALT, JWT_SECRET } = require("../utils/constants");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT, (err, hash) => {
    User.create({ ...req.body, password: hash })
      .then((user) => res.status(201).send(user))
      .catch(next);
  });
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.header("authorization", `Bearer ${token}`);
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = { getUsers, getUser, createUser, login };

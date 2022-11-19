const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { DEFAULT_USER } = require("../utils/constants");
const { UnauthorizedError } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: DEFAULT_USER.name,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
    maxLenght: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    default: DEFAULT_USER.avatar,
  },
});

userSchema.statics = {
  findUserByCredentials: function findUserByCredentials(email, password) {
    return this.findOne({ email })
      .select("+password")
      .then((user) => {
        if (!user) throw new UnauthorizedError("Incorrect email or password");
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched)
            throw new UnauthorizedError("Incorrect email or password");
          return user;
        });
      });
  },
};

module.exports = mongoose.model("User", userSchema);

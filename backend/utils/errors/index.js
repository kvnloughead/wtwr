const BadRequestError = require("./BadRequestError");
const InternalServerError = require("./InternalServerError");
const NotFoundError = require("./NotFoundError");

const getCurrentError = (err) => {
  if (err.name === "CastError") return new BadRequestError();
  if (err.name === "ValidationError") return new BadRequestError();
  if (err.name === "DocumentNotFoundError") return new NotFoundError();
  if (err.name === "MongoServerError" && err.code === 11000)
    return new BadRequestError("Email already in use");
  return new InternalServerError();
};

module.exports = { getCurrentError };

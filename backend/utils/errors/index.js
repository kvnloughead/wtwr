const BadRequestError = require("./BadRequestError");
const InternalServerError = require("./InternalServerError");
const NotFoundError = require("./NotFoundError");
const ConflictError = require("./ConflictError");

const customErrors = [
  "BadRuestError",
  "NotFoundError",
  "ConflictError",
  "UnauthorizedError",
  "InternalServerError",
];

const getCurrentError = (err) => {
  if (customErrors.includes(err.name)) return err;
  if (err.name === "CastError") return new BadRequestError();
  if (err.name === "ValidationError") return new BadRequestError();
  if (err.name === "DocumentNotFoundError") return new NotFoundError();
  if (err.name === "MongoServerError" && err.code === 11000)
    return new ConflictError("Email already in use");
  return new InternalServerError();
};

module.exports = { getCurrentError };

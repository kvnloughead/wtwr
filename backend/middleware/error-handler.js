const BadRequestError = require("../utils/errors/BadRequestError");
const InternalServerError = require("../utils/errors/InternalServerError");
const NotFoundError = require("../utils/errors/NotFoundError");
const ConflictError = require("../utils/errors/ConflictError");

const customErrors = [
  "BadRuestError",
  "NotFoundError",
  "ConflictError",
  "UnauthorizedError",
  "InternalServerError",
  "ForbiddenError",
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

const handleError = (err, req, res, next) => {
  const CurrentError = getCurrentError(err);
  res.status(CurrentError.statusCode).send({ message: CurrentError.message });
  next(err);
};

module.exports = { handleError, getCurrentError };

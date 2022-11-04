const BadRequestError = require("./BadRequestError");
const InternalServerError = require("./InternalServerError");
const NotFoundError = require("./NotFoundError");

const ERRORS = {
  CastError: new BadRequestError(),
  ValidationError: new BadRequestError(),
  MongoServerError: new BadRequestError("Email already in use"),
  DocumentNotFoundError: new NotFoundError(),
  default: new InternalServerError(),
};

module.exports = ERRORS;

const BadRequestError = require("./BadRequestError");
const InternalServerError = require("./InternalServerError");
const NotFoundError = require("./NotFoundError");

const ERRORS = {
  CastError: BadRequestError,
  ValidationError: BadRequestError,
  DocumentNotFoundError: NotFoundError,
  default: InternalServerError,
};

module.exports = ERRORS;

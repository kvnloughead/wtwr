class ForbiddenError extends Error {
  constructor(message = "Authorization required") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

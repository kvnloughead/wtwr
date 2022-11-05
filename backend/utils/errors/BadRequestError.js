class BadRequestError extends Error {
  constructor(message = "Invalid request") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

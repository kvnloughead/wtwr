class BadRequestError extends Error {
  constructor(message = "Invalid request") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = new BadRequestError();

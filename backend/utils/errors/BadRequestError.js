const CustomError = require("./CustomError");

class BadRequestError extends CustomError {
  constructor(message = "Invalid request") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

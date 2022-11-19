const CustomError = require("./CustomError");

class InternalServerError extends CustomError {
  constructor(message = "An error has occurred on the server") {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;

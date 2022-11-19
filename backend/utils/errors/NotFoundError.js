const CustomError = require("./CustomError");

class NotFoundError extends CustomError {
  constructor(message = "Requested resource not found") {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

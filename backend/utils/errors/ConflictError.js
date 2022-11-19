const CustomError = require("./CustomError");

class ConflictError extends CustomError {
  constructor(message = "Resource already exists") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;

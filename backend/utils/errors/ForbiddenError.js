const CustomError = require("./CustomError");

class ForbiddenError extends CustomError {
  constructor(message = "Authorization required") {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

const CustomError = require("./CustomError");

class UnauthorizedError extends CustomError {
  constructor(message = "Invalid credentials") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;

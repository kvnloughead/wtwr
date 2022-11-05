class ConflictError extends Error {
  constructor(message = "Resource already exists") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;

const ERRORS = require("../utils/errors");

const handleError = (err, req, res, next) => {
  const CurrentError = ERRORS[err.name] || ERRORS.default;
  res.status(CurrentError.statusCode).send({ message: CurrentError.message });
  next(err);
};

module.exports = handleError;

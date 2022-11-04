const { getCurrentError } = require("../utils/errors");

const handleError = (err, req, res, next) => {
  const CurrentError = getCurrentError(err);
  res.status(CurrentError.statusCode).send({ message: CurrentError.message });
  next(err);
};

module.exports = handleError;

const jwt = require("jsonwebtoken");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throw new UnauthorizedError();
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_KEY || "dev");
  } catch (err) {
    throw new ForbiddenError();
  }
  req.user = payload;
  next();
};

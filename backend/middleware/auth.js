const jwt = require("jsonwebtoken");
const { ForbiddenError, UnauthorizedError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization: auth } = req.headers;
  if (!auth || !auth.startsWith("Bearer ")) throw new UnauthorizedError();
  const token = auth.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_KEY || "dev");
  } catch (err) {
    throw new ForbiddenError();
  }
  req.user = payload;
  next();
};

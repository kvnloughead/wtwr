const DEFAULT_USER = {
  name: "Elise Bouer",
  avatar:
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png?etag=0807a449ad64b18fe7cd94781c622e6d",
};

const SALT = 10;
const JWT_SECRET = "not-a-secret";

module.exports = { DEFAULT_USER, SALT, JWT_SECRET };

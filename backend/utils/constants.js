const DEFAULT_USER = {
  name: "Elise Bouer",
  avatar:
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png?etag=0807a449ad64b18fe7cd94781c622e6d",
};

const TEST_USER = {
  name: "Test user",
  avatar:
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  email: "test-user@testing.com",
  password: "password",
};

const SALT = 10;

module.exports = { DEFAULT_USER, TEST_USER, SALT };

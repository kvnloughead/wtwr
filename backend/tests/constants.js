const TEST_USER = {
  name: "Test user",
  avatar:
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  email: "testing@test.com",
  password: "password",
};

const TEST_USER_DEFAULTS = {
  email: "testing@test.com",
  password: "password",
};

const TEST_USER_INVALID_NAME = {
  name: "1",
  email: "testing@test.com",
  password: "password",
};

const TEST_USER_INVALID_AVATAR = {
  avatar: "not-a-url",
  email: "testing@test.com",
  password: "password",
};

module.exports = { TEST_USER, TEST_USER_DEFAULTS };

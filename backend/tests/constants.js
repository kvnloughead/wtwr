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

const BAD_USERS = [
  { email: TEST_USER.email },
  { password: "asdfasdf" },
  { ...TEST_USER, email: "foobar" },
  { ...TEST_USER, email: "" },
  { ...TEST_USER, name: "X" },
  { ...TEST_USER, avatar: "bad-url" },
];

module.exports = { TEST_USER, TEST_USER_DEFAULTS, BAD_USERS };

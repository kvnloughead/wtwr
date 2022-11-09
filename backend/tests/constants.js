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

const INVALID_USERS = [
  { email: TEST_USER_DEFAULTS.email },
  { password: "asdfasdf" },
  { ...TEST_USER_DEFAULTS, email: "foobar" },
  { ...TEST_USER_DEFAULTS, email: "" },
  { ...TEST_USER_DEFAULTS, name: "X" },
  { ...TEST_USER_DEFAULTS, avatar: "bad-url" },
];

const INVALID_CREDENTIALS = [
  { email: "testing@test.com", password: "incorrect" },
  { email: "not-a-user@mail.com", password: "asdfasdf" },
  { email: "bademail", password: "asdfasdf" },
  { email: "bademail" },
  { password: "asdfasdf" },
];

const TEST_ITEM = {
  name: "Hat",
  weather: "hot",
  imageUrl:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
};

module.exports = {
  TEST_USER,
  TEST_USER_DEFAULTS,
  TEST_ITEM,
  INVALID_USERS,
  INVALID_CREDENTIALS,
};

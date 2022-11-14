const TEST_USER = {
  name: "Test user",
  avatar:
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  email: "testing@test.com",
  password: "password",
};

const OTHER_USER = {
  name: "Other user",
  email: "other@test.com",
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

const UNAUTHORIZED_TOKENS = [
  "",
  "Bearer",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY4MWJkOTI2NTZkOTVkZTgzODZlNjQiLCJpYXQiOjE2NjgxOTcxOTUsImV4cCI6MTY2ODgwMTk5NX0.s0blWe5cKumAzM-h4oDGtniutOTOxI9YqPwEi6Q7Qo",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY4MWJkOTI2NTZkOTVkZTgzODZlNjQiLCJpYXQXiOjE2NjgxOTcxOTUsImV4cCI6MTY2ODgwMTk5NX0.s0blWe5cKumAzM-h4oDGtniutOTOxI9YqPwEi6Q7Qo",
];

const FORBIDDEN_TOKENS = [
  "Bearer foo",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY4MWJkOTI2NTZkOTVkZTgzODZlNjQiLCJpYXQiOjE2NjgxOTcxOTUsImV4cCI6MTY2ODgwMTk5NX0.s0blWe5cKumAzM-h4oDGtniutOTOxI9YqPwEi6Q7Qo",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY4MWJkOTI2NTZkOTVkZTgzXODZlNjQiLCJpYXQiOjE2NjgxOTcxOTUsImV4cCI6MTY2ODgwMTk5NX0.s0blWe5cKumAzM-h4oDGtniutOTOxI9YqPwEi6Q7Qo",
];

const TEST_ITEM = {
  name: "Hat",
  weather: "hot",
  imageUrl:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
};

const removeProperty = (obj, property) => {
  const newObj = { ...obj };
  delete newObj[property];
  return newObj;
};

const INVALID_ITEMS = [
  { ...TEST_ITEM, name: "" },
  { ...TEST_ITEM, weather: "yellow" },
  { ...TEST_ITEM, imageUrl: "#" },
  removeProperty(TEST_ITEM, "name"),
  removeProperty(TEST_ITEM, "weather"),
  removeProperty(TEST_ITEM, "imageUrl"),
];

module.exports = {
  TEST_USER,
  OTHER_USER,
  TEST_USER_DEFAULTS,
  TEST_ITEM,
  INVALID_USERS,
  INVALID_CREDENTIALS,
  UNAUTHORIZED_TOKENS,
  FORBIDDEN_TOKENS,
  INVALID_ITEMS,
};

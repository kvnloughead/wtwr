const { getCurrentError } = require("../utils/errors/index");

const simpleErrors = [
  { name: "CastError", status: 400, message: "Invalid request" },
  { name: "ValidationError", status: 400, message: "Invalid request" },
  {
    name: "DocumentNotFoundError",
    status: 404,
    message: "Requested resource not found",
  },
  {
    name: "SomeOtherError",
    status: 500,
    message: "An error has occurred on the server.",
  },
];

const mongoServerErrors = [
  { code: 11000, status: 409, message: "Email already in use" },
  { code: 10101, status: 500, message: "An error has occurred on the server." },
  {
    code: undefined,
    status: 500,
    message: "An error has occurred on the server.",
  },
];

test("simple errors", () => {
  simpleErrors.forEach(({ name, status, message }) => {
    const CurrentError = getCurrentError({ name });
    expect(CurrentError.message).toBe(message);
    expect(CurrentError.statusCode).toBe(status);
  });
});

test("MongoServerErrors", () => {
  mongoServerErrors.forEach(({ code, status, message }) => {
    const CurrentError = getCurrentError({ name: "MongoServerError", code });
    expect(CurrentError.message).toBe(message);
    expect(CurrentError.statusCode).toBe(status);
  });
});

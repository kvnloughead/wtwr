const { getCurrentError } = require("../middleware/error-handler");
const { SIMPLE_ERRORS, MONGO_SERVER_ERRORS } = require("./constants");

test("simple errors", () => {
  SIMPLE_ERRORS.forEach(({ received, expected }) => {
    const CurrentError = getCurrentError(received);
    expect(CurrentError.message).toBe(expected.message);
    expect(CurrentError.statusCode).toBe(expected.status);
    expect(CurrentError.name).toBe(expected.name);
    expect(CurrentError).toHaveProperty("stack");
  });
});

test("MongoServerErrors", () => {
  MONGO_SERVER_ERRORS.forEach(({ received, expected }) => {
    const CurrentError = getCurrentError({
      name: "MongoServerError",
      code: received.code,
    });
    expect(CurrentError.message).toBe(expected.message);
    expect(CurrentError.statusCode).toBe(expected.status);
    expect(CurrentError.name).toBe(expected.name);
    expect(CurrentError).toHaveProperty("stack");
  });
});

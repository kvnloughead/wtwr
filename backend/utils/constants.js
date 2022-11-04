const ERROR_MESSAGES = {
  unauthorized: () => `Authorization Required`,
  ownedItemsOnly: () =>
    `Authorization required. You can only delete your own clothing items.`,
  internalServer: () => `An error has occured on the server.`,
  badRequest: (resource) =>
    `Data validation failed: ${resource} cannot be created.`,
  notFound: (resource) => `${resource} not found.`,
};

const STATUS_CODES = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServer: 500,
};

const DEFAULT_USER = {
  name: "Elise Bouer",
  avatar:
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png?etag=0807a449ad64b18fe7cd94781c622e6d",
};

module.exports = { ERROR_MESSAGES, STATUS_CODES, DEFAULT_USER };

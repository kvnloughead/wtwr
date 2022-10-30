module.exports.ERROR_MESSAGES = {
  unauthorized: () => `Authorization Required`,
  ownedItemsOnly: () =>
    `Authorization required. You can only delete your own clothing items.`,
  internalServer: () => `An error has occured on the server.`,
  badRequest: (resource) =>
    `Data validation failed: ${resource} cannot be created.`,
  notFound: (resource) => `${resource} not found.`,
};

module.exports.STATUS_CODES = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServer: 500,
};

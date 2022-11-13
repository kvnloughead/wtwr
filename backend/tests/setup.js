const mongoose = require("mongoose");

const createServer = require("../server");

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/wtwr_db_test",
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
});

const app = createServer();

module.exports = { app };

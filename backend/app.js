const mongoose = require("mongoose");
const createServer = require("./server");
require("dotenv").config();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://localhost:27017/wtwr_db").then(() => {
  const app = createServer();
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});

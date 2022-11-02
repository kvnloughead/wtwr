const express = require("express");
const mongoose = require("mongoose");
const handleError = require("./middleware/error-handler");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "635b1da3e2bde2e21b6ef4cf",
  };
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use("/", require("./routes"));

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "635b1d79e2bde2e21b6ef4cb",
  };
  next();
});

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

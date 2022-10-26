const express = require("express");

const { PORT = 3001 } = process.env;
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

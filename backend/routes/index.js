const router = require("express").Router();

const users = require("./users");
const items = require("./clothingItems");

router.use("/users", users);
router.use("/items", items);

router.use("/", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;

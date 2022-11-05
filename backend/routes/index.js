const router = require("express").Router();

const users = require("./users");
const items = require("./clothingItems");

router.use("/users", require("../middleware/auth"), users);
router.use("/items", require("../middleware/auth"), items);

module.exports = router;

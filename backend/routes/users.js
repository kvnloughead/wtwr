const router = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");

router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;

const router = require("express").Router();
const { getUsers, getUser, getCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;

const router = require("express").Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.get("/:id", getUser);
router.patch("/me", updateUser);
router.get("/", getUsers);

module.exports = router;

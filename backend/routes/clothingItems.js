const router = require("express").Router();
const {
  createItem,
  deleteItem,
  setLike,
} = require("../controllers/clothingItems");

router.post("/", createItem);
router.delete("/:id", deleteItem);
router.patch("/:itemId/likes", setLike);
router.delete("/:itemId/likes", setLike);

module.exports = router;

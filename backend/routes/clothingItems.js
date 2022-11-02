const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  setLike,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:id", deleteItem);
router.put("/:itemId/likes", setLike);
router.delete("/:itemId/likes", setLike);

module.exports = router;

const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../utils/errors/NotFoundError");
const ForbiddenError = require("../utils/errors/ForbiddenError");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  ClothingItem.create({ ...req.body, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch(next);
};

const deleteItem = async (req, res) => {
  const item = await ClothingItem.findOne({ _id: req.params.id }).orFail();
  if (item.owner.toString() !== req.user._id) {
    throw new ForbiddenError();
  }
  const result = await ClothingItem.deleteOne({ _id: req.params.id });
  if (result.deletedCount === 0) {
    throw new NotFoundError();
  }
  res.status(200).send(result);
};

const setLike = (req, res, next) => {
  const action =
    req.method === "PATCH"
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } };
  ClothingItem.findByIdAndUpdate(req.params.itemId, action, { new: true })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch(next);
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  setLike,
};

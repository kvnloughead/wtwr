const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../utils/errors/NotFoundError");

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

const deleteItem = (req, res, next) => {
  ClothingItem.deleteOne({ _id: req.params.id })
    .orFail()
    .then((result) => {
      if (result.deletedCount === 0) throw new NotFoundError();
      res.status(200).send(result);
    })
    .catch(next);
};

const setLike = (req, res, next) => {
  const action =
    req.method === "PUT"
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

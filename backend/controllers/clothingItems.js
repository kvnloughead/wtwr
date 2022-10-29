const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(console.error);
};

const createItem = (req, res) => {
  ClothingItem.create(req.body)
    .then((item) => res.status(201).send(item))
    .catch(console.error);
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.deleteOne({ id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(console.error);
};

module.exports = { getItems, createItem, deleteItem };

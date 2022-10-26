const mongoose = require("mongoose");
const validator = require("validator");

const { ObjectId } = mongoose.Schema.Types;

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  weather: { type: String, required: true, enum: ["hot", "cold", "warm"] },
  imageUrl: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    required: true,
  },
  owner: { type: ObjectId, ref: "User", required: true },
  likes: { type: [ObjectId], ref: "User", default: [] },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);

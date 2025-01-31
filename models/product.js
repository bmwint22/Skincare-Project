const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['cleanser', 'moisturizer', 'sunscreen']
  },
  price: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

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

});


const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },

  products: [productSchema],
});



const User = mongoose.model('User', userSchema)
module.exports = User

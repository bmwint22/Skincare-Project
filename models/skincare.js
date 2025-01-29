const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  productID: {
    type: primaryKey,
    required: true,
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
    enum: ['cleanser', 'moisturizer', 'exfoliator', 'serum', 'sunscreen']
  },
  price: {
    type: String,
    required: true
  },
  userID: {
    type: foreignKey,
    reuired: true
},

});

  
  const userSchema = new mongoose.Schema({
    userId: {
      type: primaryKey,
      required: true,
    },
    name: {
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
  



  
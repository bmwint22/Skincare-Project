const mongoose = require("mongoose");

// models/user.js

const applicationSchema = new mongoose.Schema({

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

    products: [productSchema], // embedding the applicationSchema here
  });
  

  
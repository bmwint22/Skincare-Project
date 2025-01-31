const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();
    
    res.render("products/index.ejs", { products });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.showNewProductForm = async (req, res) => {
  res.render("products/new.ejs");
};

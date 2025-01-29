const express = require('express');
const app = express();
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


app.get("/", async (req, res) => {
    res.send("Skincare!");
  });
  
  
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  

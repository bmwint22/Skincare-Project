const express = require('express');
const app = express();
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./authController');
const productsController = require('./controllers/products.js');


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView); 

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.use('/auth', authController);
app.use(isSignedIn); 


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
  

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});


app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/products', productsController); // New!

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

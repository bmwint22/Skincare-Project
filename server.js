const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");

const cors = require("cors");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const authController = require("./controllers/auth.js");
const productsController = require("./controllers/products.js");


const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/skincareDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/auth", authController);
app.use(isSignedIn);
app.use("/users/:userId/products", productsController);


app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/products`);
  } else {
    res.render("index.ejs", { user: req.session.user });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;
// const mongoose = require("mongoose");

// //const connectDB = require("/config/db"); 
// mongoose.connect("mongodb://127.0.0.1:27017/Product", {
//   useNewUrlParser
 

// });


const express = require("express");

const app = express();

const PORT = process.env.PORT || 6000;

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const Joi = require("joi");

const { log } = require("console");




mongoose.connect("mongodb://127.0.0.1:27017/Product", {

  useNewUrlParser: true,

});




app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());




const userSchema = new mongoose.Schema({

  Name: String,

  Email: String,

  Password: String,

  phoneNumber: Number,

});




const productSchema = new mongoose.Schema({

  productName: String,

  Price: String,

  Category: String,

  Description: String,

  Rating: Number,

});

const Users = mongoose.model("User", userSchema);

const Product = mongoose.model("Products", productSchema);




app.get("/home", (req, res) => {

  res.send("hello products");

});




app.post("/signUp", (req, res) => {

  const { error, value } = User(req.body);

  if (error) {

    res.status(404);

  } else {

    try {

      const user = new Users({

        Name: value.Name,

        Email: value.Email,

        Password: value.Password,

        phoneNumber: value.phoneNumber,

      });

      user.save().then(() => {

        res.send("Sign up successful");

      });

    } catch (error) {

      res.status(404);

    }

  }

});




app.post("/login", async (req, res) => {

  const { error, value } = User(req.body);

  if (error) {

    res.status(404);

  } else {

    try {

      const userlogin = new Users({

        Email: value.Email,

        Password: value.Password,

      });

      userlogin.save.then(() => {

        res.send("Login successful");

      });

    } catch (error) {

      res.status(404);

    }

  }

});




app.post("/createProducts", (req, res) => {

  console.log(req.body);

  const { error, value } = Products(req.body);

  if (error) {

    res.status(404);

  } else {

    try {

      const createProducts = new Product({

        productName: value.productName,

        Price: value.Price,

        Category: value.Category,

        Description: value.Description,

        Rating: value.Rating,

      });

      createProducts.save().then(() => {

        res.send("Product created successfully");

      });

    } catch (error) {

      res.status(404);

    }

  }

});




app.get("/allProducts", async (req, res) => {

  try {

    const getProducts = await Product.find({});

    res.status(201).json(getProducts);

  } catch (error) {

    console.log(error);

  }

});




app.get("/aProduct", async (req, res) => {

  try {

    const getProduct = await Product.findOne({

      _id: req.body.id,

    });

    res.send(getProduct);

  } catch (error) {

    console.log(error);

  }

});




app.put("/updateProduct", async (req, res) => {

  const updateProduct = req.body;

  try {

    const updated = await Product.findOneAndUpdate(

      { _id: updateProduct._id },

      { Price: 60 }

    );

    updated.save().then(() => {

      res.status(201).send("update successfull");

    });

  } catch (error) {

    console.log(error);

  }

});




app.delete("/delete", async (req, res) => {});




app.listen(PORT, () => {

  console.log("Server is served on Port" + " " + PORT);

});




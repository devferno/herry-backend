const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { adminRoute, productRoute, customerRoute } = require("./routes");
const { Product, Category } = require("./models");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cors());

app.delete("/", (req, res) => {
  try {
    Category.deleteMany({}, () => {
      res.status(200).json("nice");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//connect to db
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log("error connection");
  } else {
    console.log("mongodb connected");
  }
});

//routes middleware
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/customer", customerRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app runinng at http://localhost:${PORT}`));

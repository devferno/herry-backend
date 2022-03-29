const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");
const { Product } = require("../models");
const { verifyAdmin } = require("../utils/middlewares");
const { upload } = require("../utils/uploadStorage");

//post product
router.post("/", verifyAdmin, upload.array("image", 4), async (req, res) => {
  try {
    const { name, price, description, type, gender, stock } = req.body;
    //make array of images
    let images = [];
    req.files.forEach((element) => {
      const obj = { contentType: "image/png" };
      obj.data = fs.readFileSync(
        path.join(__dirname + "/../uploads/" + element.filename)
      );
      fs.unlinkSync(path.join(__dirname + "/../uploads/" + element.filename));
      images.push(obj);
    });

    //if category already exist dont create a new one
    let category = await Category.findOne({ type, gender });
    if (category == null) category = new Category({ type, gender });

    let product = {};
    category.save().then(() => {
      product = {
        category: category._id,
        name,
        price: parseInt(price),
        description,
        images,
        stock: parseInt(stock),
      };
      Product.create(product, (err, item) => {
        if (err) {
          res.status(450).json(err);
        } else {
          item.save();
        }
      });
      res.status(200).json(product);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("not found");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product
router.post(
  "/update/:id",
  verifyAdmin,
  upload.array("image", 4),
  async (req, res) => {
    try {
      const { name, price, description, type, gender, stock } = req.body;

      //make array of images
      let images = [];
      req.files.forEach((element) => {
        const obj = { contentType: "image/png" };
        obj.data = fs.readFileSync(
          path.join(__dirname + "/../uploads/" + element.filename)
        );
        fs.unlinkSync(path.join(__dirname + "/../uploads/" + element.filename));
        images.push(obj);
      });

      //if category already exist dont create a new one
      let category = await Category.findOne({ type, gender });
      if (category == null) category = new Category({ type, gender });

      let product = {};
      category.save().then(async () => {
        product = {
          category: category._id,
          name,
          price: parseInt(price),
          description,
          images,
          stock: parseInt(stock),
        };

        await Product.findOneAndUpdate({ _id: req.params.id }, product);
        res.status(200).json("updated");
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//delete product
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("done");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Customer, Rate } = require("../models");
const { verifyAdmin } = require("../utils/middlewares");
const ShoppingCardItem = require("../models/ShoppingCardItem");

//signup customer
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    //check if user with this email already exist
    const customer = await Customer.findOne({ email });
    if (customer)
      return res.status(400).json("customer with this email already exist");
    const hashedPass = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
      email,
      fullname,
      password: hashedPass,
    });
    await newCustomer.save();
    res.status(200).json(newCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//signin customer
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json("wrong credentials!");
    const dehashed = await bcrypt.compare(password, customer.password);
    if (!dehashed) return res.status(404).json("wrong credentials");
    const token = jwt.sign({ id: customer._id }, process.env.SECRET_KEY);

    res.status(200).json({ access: token });
  } catch (err) {}
});

//add to cart
router.post("/card/:id", verifyAdmin, async (req, res) => {
  try {
    const { number } = req.body;
    const product = req.params.id;
    const customer = req.user.id;
    const cardItem = await ShoppingCardItem.findOne({ product, customer });
    if (cardItem) {
      await ShoppingCardItem.findOneAndUpdate(
        { _id: cardItem._id },
        { number, product, customer }
      );
      res.status(200).json("done");
    } else {
      const newCardItem = new ShoppingCardItem({ number, product, customer });
      await newCardItem.save();
      res.status(200).json(newCardItem);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete from cart
router.delete("/card/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedCard = await ShoppingCardItem.findOneAndDelete({
      customer: req.user.id,
      product: req.params.id,
    });
    res.status(200).json("done");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get card
router.get("/card", verifyAdmin, async (req, res) => {
  try {
    const card = await ShoppingCardItem.find({ customer: req.user.id });
    if (!card[0]) return res.status(404).json("not found");
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json(err);
  }
});

//rate product
router.post("/rate/:id", verifyAdmin, async (req, res) => {
  try {
    const product = req.params.id;
    const customer = req.user.id;
    const { number, comment } = req.body;
    const rate = await Rate.findOne({ product, customer });
    if (rate) return res.status(404).json("you already set a rate");
    const newRate = new Rate({ product, customer, number, comment });
    await newRate.save();
    res.status(200).json("added success!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Admin, Customer } = require("../models");
const jwt = require("jsonwebtoken");
const { verifyAdmin } = require("../utils/middlewares");

//admin gonna signup manually no need for endpoint maybe for the second version

//signin
router.post("/signin", async (req, res) => {
  try {
    const { login, password } = req.body;
    const admin = await Admin.findOne({ login, password });
    if (!admin) return res.status(404).json("wrong credentials");
    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);
    res.status(200).json({ access: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one customer
router.get("/customer/:id", verifyAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const { fullname, email } = customer;
    res.status(200).json({ fullname, email });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all customers
router.get("/customers", verifyAdmin, async (req, res) => {
  try {
    const allCustomers = await Customer.find({});
    res.status(200).json(allCustomers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

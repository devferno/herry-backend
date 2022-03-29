const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.status(404).json(err);
      req.user = token;
      next();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { verifyAdmin };

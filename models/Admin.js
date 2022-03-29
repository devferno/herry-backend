const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

module.exports = model("Admin", adminSchema);

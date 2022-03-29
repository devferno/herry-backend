const { model, Schema } = require("mongoose");

const cardItem = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ShoppingCardItem", cardItem);

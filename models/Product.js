const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [{ data: Buffer, contentType: String }],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);

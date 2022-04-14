const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["men", "women", "kids"],
      default: "men",
    },
    type: {
      type: String,
      enum: [
        "JEANS",
        "SWIMWEAR",
        "SHIRTS",
        "T-SHIRTS",
        "SHOES",
        "BODYSUITS",
        "BAGS",
        "ACCESSORIES",
        "DRESSES",
        "GILETS",
        "BACKPACKS",
        "JACKETS",
        "SHORTS",
        "PERFUMES",
        "HOODIES",
        "HOMEWEAR",
      ],
    },
    gender: {
      type: String,
      enum: ["men", "women", "kids"],
      default: "men",
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

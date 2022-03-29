const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    gender: {
      type: String,
      enum: ["men", "women", "kids"],
      default: "men",
    },
    type: {
      type: String,
      enum: [
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
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);

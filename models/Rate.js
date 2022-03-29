const { model, Schema } = require("mongoose");

const rateSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    comment: {
      type: String,
      required: false,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = model("Rate", rateSchema);

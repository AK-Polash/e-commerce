const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
    },

    image: {
      type: String,
      required: [true, "Brand image is required"],
    },
  },

  {
    timestamps: true,
  }
);

const Brand = model("Brand", BrandSchema);

module.exports = Brand;

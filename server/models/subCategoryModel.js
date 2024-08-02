const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Sub-Category name is required"],
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category name is required"],
    },

    image: {
      type: String,
      required: [true, "Category image is required"],
    },
  },

  {
    timestamps: true,
  }
);

const SubCategory = model("SubCategory", SubCategorySchema);

module.exports = SubCategory;

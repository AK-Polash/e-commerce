const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
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

const Category = model("Category", CategorySchema);

module.exports = Category;

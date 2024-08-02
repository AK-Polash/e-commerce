const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const VariationSchema = new Schema({
  sku: {
    type: String,
    required: [true, "SKU is required"],
    unique: true,
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
  },

  salePrice: {
    type: Number,
  },

  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },

  attributes: [
    {
      name: {
        type: String,
        required: [true, "Attribute name is required"],
      },

      value: {
        type: String,
        required: [true, "Attribute value is required"],
      },
    },
  ],

  images: [
    {
      type: String,
      required: [true, "Product variation image is required"],
    },
  ],
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },

    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "Product sub-category is required"],
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Product brand is required"],
    },

    productType: {
      type: String,
      required: [true, "Product type is required"],
    }, // 'electrical', 'clothing'

    images: [
      {
        type: String,
      },
    ],

    variations: [VariationSchema],
  },

  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);

module.exports = Product;

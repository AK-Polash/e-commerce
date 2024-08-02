const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Create a new product
exports.createProductController = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Product has been created successfully",
    data: {
      product,
    },
  });
});

// Get all products
exports.getAllProductsController = catchAsync(async (req, res) => {
  const products = await Product.find()
    .populate("category")
    .populate("subCategory")
    .populate("brand");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// Get a product by ID
exports.getProductController = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .populate("brand");

  if (!product)
    return next(new AppError("No product found with that ID!", 404));

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// Update a product by ID
exports.updateProductController = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return next(new AppError("No product found with that ID!", 404));

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// Delete a product by ID
exports.deleteProductController = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return next(new AppError("No product found with that ID!", 404));

  res.status(204).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});

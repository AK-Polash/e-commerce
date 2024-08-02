const Category = require("../models/CategoryModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Create a new category
exports.createCategoryController = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Category has been created successfully",
    data: {
      category,
    },
  });
});

// Get all categories
exports.getAllCategoryController = catchAsync(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
});

// Get a category by ID
exports.getCategoryController = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return next(new AppError("No category was found with that ID!", 404));

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

// Update a category by ID
exports.updateCategoryController = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category)
    return next(new AppError("No category was found with that ID!", 404));

  res.status(200).json({
    status: "success",
    message: "Category has been updated successfully",
    data: {
      category,
    },
  });
});

// Delete a category by ID
exports.deleteCategoryController = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return next(new AppError("No category was found with that ID!", 404));

  res.status(204).json({
    status: "success",
    message: "Category deleted successfully",
    data: null,
  });
});

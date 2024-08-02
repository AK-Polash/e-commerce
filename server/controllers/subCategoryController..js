const SubCategory = require("../models/subCategoryModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Create a new sub-category
exports.createSubCategoryController = catchAsync(async (req, res) => {
  const subCategory = await SubCategory.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Sub-Category has been created successfully",
    data: {
      subCategory,
    },
  });
});

// Get all sub-categories
exports.getAllSubCategoryController = catchAsync(async (req, res) => {
  const subCategories = await SubCategory.find({});

  res.status(200).json({
    status: "success",
    results: subCategories.length,
    data: {
      subCategories,
    },
  });
});

// Get a sub-category by ID
exports.getSubCategoryController = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory)
    return next(new AppError("No sub-category was found with that ID!", 404));

  res.status(200).json({
    status: "success",
    data: {
      subCategory,
    },
  });
});

// Update a sub-category by ID
exports.updateSubCategoryController = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subCategory)
    return next(new AppError("No category was found with that ID!", 404));

  res.status(200).json({
    status: "success",
    message: "Sub-Category has been updated successfully",
    data: {
      subCategory,
    },
  });
});

// Delete a sub-category by ID
exports.deleteSubCategoryController = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

  if (!subCategory)
    return next(new AppError("No sub-category was found with that ID!", 404));

  res.status(204).json({
    status: "success",
    message: "Sub-Category deleted successfully",
    data: null,
  });
});

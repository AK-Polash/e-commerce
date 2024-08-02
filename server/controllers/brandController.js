const Brand = require("../models/brandModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Create a new brand
exports.createBrandController = catchAsync(async (req, res) => {
  const brand = await Brand.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Brand has been created successfully",
    data: {
      brand,
    },
  });
});

// Get all brands
exports.getAllBrandController = catchAsync(async (req, res) => {
  const brands = await Brand.find({});

  res.status(200).json({
    status: "success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

// Get a brand by ID
exports.getBrandController = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand)
    return next(new AppError("No brand was found with that ID!", 404));

  res.status(200).json({
    status: "success",
    data: {
      brand,
    },
  });
});

// Update a brand by ID
exports.updateBrandController = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!brand)
    return next(new AppError("No brand was found with that ID!", 404));

  res.status(200).json({
    status: "success",
    message: "Brand has been updated successfully",
    data: {
      brand,
    },
  });
});

// Delete a brand by ID
exports.deleteBrandController = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand)
    return next(new AppError("No brand was found with that ID!", 404));

  res.status(204).json({
    status: "success",
    message: "Brand deleted successfully",
    data: null,
  });
});

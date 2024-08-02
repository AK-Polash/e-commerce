const express = require("express");
const {
  createCategoryController,
  getAllCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controllers/categoryController");

const router = express.Router();

router.route("/").post(createCategoryController).get(getAllCategoryController);

router
  .route("/:id")
  .get(getCategoryController)
  .patch(updateCategoryController)
  .delete(deleteCategoryController);

module.exports = router;

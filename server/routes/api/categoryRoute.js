const express = require("express");
const {
  createCategoryController,
} = require("../../controllers/categoryController");

const router = express.Router();

router.route("/").post(createCategoryController);

module.exports = router;

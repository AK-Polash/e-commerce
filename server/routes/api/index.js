const express = require("express");
const categoryRoute = require("./categoryRoute");

const router = express.Router();

router.use("/category", categoryRoute);

module.exports = router;

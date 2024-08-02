const express = require("express");
const errorRouteMiddleware = require("../middlewares/errorRouteMiddleware");
const apiRoutes = require("./api");
const BASE_URL = process.env.BASE_URL;

const router = express.Router();

router.use(BASE_URL, apiRoutes);
router.all("*", errorRouteMiddleware);

module.exports = router;

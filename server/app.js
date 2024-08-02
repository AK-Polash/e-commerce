const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const monogoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const globalErrorMiddleware = require("./middlewares/globalErrorMiddleware");
const routes = require("./routes");

const app = express();

// GLOBAL MIDDLEWARES:
app.use(express.static(path.join(__dirname, "public"))); // Serving static files
app.use(helmet()); // Set security HTTP headers

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again after an hour!",
});

app.use("/api", limiter); // Limit request from same IP
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(monogoSanitize()); // Data sanitization against NoSQL query injection --> "email": { "$gt": "" }

// Prevent parameter polution --> same paramiter multiple time
app.use(
  hpp({
    whitelist: [
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "duration",
      "price",
    ],
  })
);

app.use(routes);
app.use(globalErrorMiddleware);

module.exports = app;

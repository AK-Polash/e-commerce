const AppError = require("../utils/AppError");

const handleCastErrorDB = (err) => {
  let message;

  if (err.valueType === "Object") {
    message = "Object value is not allowed, Please use proper value!";
  } else {
    message = `Invalid ${err.path}: ${err.value}.`;
  }

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyPattern).join(" ");

  const capitalizeField =
    field.charAt(0).toUpperCase() + field.slice(1).toLocaleLowerCase();

  const message = `${capitalizeField} already exist, Please use another ${field}.`; // ${err.keyValue.name}
  return new AppError(message, 409);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors)
    .map((item) => item.message)
    .join(". ");

  const message = `Validation failed, ${errors}.`;
  return new AppError(message, 400);
};

const handleParallelExcludeIncludeDB = () => {
  const message = "Cannot perform exclusion & inclusion at the same time.";
  return new AppError(message, 409);
};

const handleJWTError = () => {
  const message = "Invalid token!, Please try again later.";
  return new AppError(message, 401);
};

const handleJWTExpiration = () => {
  const message = "Token has been expired! Try again later.";
  return new AppError(message, 401);
};

const sendErrorDev = (err, req, res) => {
  // A) API ERRORS
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE ERRORS
  console.error("ERROR --> ", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API ERRORS
  if (req.originalUrl.startsWith("/api")) {
    // 1) Operational, trusted error: Send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // 2) Programming or other unknown errro: Dont't leake error details
    console.error("ERROR --> ", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, Try again!",
    });
  }

  // B) RENDERED WEBSITE ERRORS
  // 1) Operational, trusted error: Send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  // 2) Programming or other unknown errro: Dont't leake error details
  console.error("ERROR --> ", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production ") {
    // let error = { ...err };
    // error.message = err.message;
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.code === 31254 || err.code === 31253) {
      err = handleParallelExcludeIncludeDB();
    }
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiration();

    sendErrorProd(err, req, res);
  }
};

module.exports = globalErrorHandler;

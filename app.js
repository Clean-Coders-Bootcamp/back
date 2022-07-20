var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");

var indexRouter = require("./routes/index");

var articulesRouter = require("./routes/articules.js");

const jwtAuth = require("./middleware/validate-token");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
// const dashboardRoutes = require("./routes/dashboard");
var app = express();
require("./data/connect_mongodb");

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

/**
 * API v1 routes
 */
// app.use("/api/dashboard", jwtAuth, dashboardRoutes);
app.use("/", indexRouter);

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/articules", articulesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

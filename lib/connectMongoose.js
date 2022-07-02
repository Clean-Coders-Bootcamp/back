"use strict";

const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", function (err) {
  console.error("mongodb connection error:", err);
  process.exit(1);
});

mongoose.connection.once("open", function () {
  console.info("Connected to mongodb.");
});

const connectionPromise = mongoose.connect("mongodb://localhost/welldone", {
  useUnifiedTopology: true,
});

module.exports = connectionPromise;

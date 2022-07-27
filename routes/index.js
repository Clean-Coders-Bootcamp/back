var express = require("express");
// const jwtAuth = require("../middleware/validate-token");
var router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/user/:id", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/api/v1/users", async (req, res, next) => {
  try {
    const userData = req.body;
    console.log(userData);
    const user = new User(userData);
    const savedUser = await user.save();
    res.status(201).json({ result: savedUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

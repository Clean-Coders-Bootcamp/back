var express = require("express");
const Articule = require("../models/Articule");
var router = express.Router();

/* GET articules. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/api/v1/articules", async (req, res, next) => {
  try {
    const articuleData = req.body;
    const articule = new Articule(articuleData);
    const savedArticule = await articule.save();
    res.status(201).json({ result: savedArticule });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

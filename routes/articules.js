var express = require("express");
const Articule = require("../models/Articule");
var router = express.Router();

/* GET articules. */
router.get("/", async (req, res, next) => {
  try{
    const articules = await Articule.list();
    res.json({result: articules});
  } catch(err){
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const articuleData = req.body;
    const date = new Date().toString()
    articuleData.date = date;
    const articule = new Articule(articuleData);
    const savedArticule = await articule.save();
    res.status(201).json({ result: savedArticule });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

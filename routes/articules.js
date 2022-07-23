var express = require("express");
const Articule = require("../models/Articule");
var router = express.Router();

// config multer to upload images
const multer = require("multer");
const path = require("path");
const { dirname, resolve } = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({storage});

/* GET articules. */
router.get("/", async (req, res, next) => {
  try{
    const articules = await Articule.list();
    res.json({result: articules});
  } catch(err){
    next(err);
  }
});

router.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    console.log(req.file)
    const articuleData = req.body;
    articuleData.photo = "." + req.file.path.split("public")[1];
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

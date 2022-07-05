var express = require("express");
const User = require("../models/User");

var router = express.Router();
router.post("/", async (req, res, next) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    const savedUser = await user.save();
    res.status(201).json({ result: savedUser });
  } catch (err) {
    next(err);
  }
});

// Otra foirma de hacerlo
// router.post("/", async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   try {
//     const savedUser = await user.save();
//     res.json({
//       error: null,
//       data: savedUser,
//     });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// });

// const isEmailExist = await User.findOne({ email: req.body.email });
// if (isEmailExist) {
//   return res.status(400).json({ error: "Email ya registrado" });
// }

// const isNicknameExist = await User.findOne({ nickname: req.body.nickname });
// if (isNicknameExist) {
//   return res.status(400).json({ error: "Nickname ya registrado" });
// }

module.exports = router;

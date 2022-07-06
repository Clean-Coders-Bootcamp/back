var express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

var router = express.Router();

// router.post("/", async (req, res, next) => {
//   try {
//     const userData = req.body;
//     const user = new User(userData);
//     const savedUser = await user.save();
//     res.status(201).json({ result: savedUser });
//   } catch (err) {
//     next(err);
//   }
// });

// Otra foirma de hacerlo
router.post("/", async (req, res, next) => {
  // Encripta contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    nickname: req.body.nickname,
    password: password,
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = Number(req.params);
  User.findOneAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = router;

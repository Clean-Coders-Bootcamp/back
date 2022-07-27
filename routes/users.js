var express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

var router = express.Router();

router.post("/", async (req, res, next) => {
  // Encripta contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    username: req.body.username,
    password: password,
  });
  try {
    const savedUser = await user.save();
    res.json({
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.findOne({ _id: id });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.list();
    res.json({ result: users });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log("delete:", id);
  User.findOneAndDelete({ _id: id })
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

router.put("/", async (req, res, next) => {
  let body = req.body;
  console.log("BODY", body);
  try {
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    User.updateOne(
      { _id: body._id },
      {
        $set: req.body,
      },

      function (err, info) {
        if (err) {
          res.json({
            result: false,
            msg: "Could not modify user",
            err,
          });
        } else {
          res.json({
            result: true,
            msg: "User edited",
            info: info,
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      result: false,
      msg: "Could not modify user",
      err: error.message,
    });
  }
});

module.exports = router;

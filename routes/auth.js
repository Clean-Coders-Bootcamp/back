var express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // Validaciones de login
  const userName = await User.findOne({ username: req.body.username });
  if (!userName) return res.status(400).json({ error: "Username not found" });
  // Validacion de existencia
  const emailUser = await User.findOne({ email: req.body.email });
  if (!emailUser) return res.status(400).json({ error: "User not found" });

  const validPassword = await bcrypt.compare(
    req.body.password,
    userName.password
  );
  if (!validPassword)
    return res.status(400).json({ error: "Invalid password" });

  const accessToken = jwt.sign(
    {
      name: userName.name,
      id: userName._id,
    },
    process.env.JWT_SECRET
  );

  res.header("auth-token", accessToken).json({
    accessToken,
  });
});

module.exports = router;

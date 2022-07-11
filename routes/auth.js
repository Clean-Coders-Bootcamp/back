var express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // Validaciones de login
  const userName = await User.findOne({ username: req.body.username });
  if (!userName)
    return res.status(400).json({ error: "Nombre de usuario no encontrado" });
  // Validaciond e existencia
  const emailUser = await User.findOne({ email: req.body.email });
  if (!emailUser)
    return res.status(400).json({ error: "Usuario no encontrado" });

  // Validacion de password en la base de datos
  // const validPassword = await User.findOne({ password: req.body.password });
  const validPassword = await bcrypt.compare(
    req.body.password,
    userName.password
  );
  if (!validPassword)
    return res.status(400).json({ error: "Constraseña invalida" });

  //   res.json({
  //     error: null,
  //     data: "bienvenido",
  //   });

  const token = jwt.sign(
    {
      name: userName.name,
      id: userName._id,
    },
    process.env.JWT_SECRET
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
    message: "Welcome",
  });
});

module.exports = router;

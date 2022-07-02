"use strict";
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

class LoginController {
  index(req, res, next) {
    (res.locals.email = ""), (res.locals.error = ""), res.render("login");
  }

  // Cierre de sesion
  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }

  // Login post desde api que retorna jwt
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
      // Busqueda de usuario en bd
      const user = await User.findOne({ email });

      //Comprueba Si no existe usuario en la bd

      if (!user) {
        const err = new Error();
        err.message = res.__("User not found");
        err.status = 401;
        next(err);

        return;
      }

      // comprueba si no existe el usuario o no coincide contraseña
      if (!user || (await user.comparePassword(password))) {
        const err = new Error();
        err.message = res.__("Invalid credentials");
        err.status = 401;
        next(err);

        return;
      }
      // Genera un JWT si coinciden usuario y contraseña
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // Devuelve token al clientew en formato json
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      next(err);
    }
  }
}
module.exports = LoginController;

"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// CREO EL ESQUEMA
const userSchema = mongoose.Schema({
  //   name: String,
  //   surname: String,
  email: { type: String, unique: true },
  //   nickname: String,
  password: String,
});
// METODO ESTATICO
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 7);
};
// METODO DE INSTANCIA
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// CREO MODELO
const User = mongoose.model("User", userSchema);

// EXPORTO EL MODELO
module.exports = User;

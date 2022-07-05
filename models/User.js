"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// CREO EL ESQUEMA
const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true, required: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);
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

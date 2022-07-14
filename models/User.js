"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// CREO EL ESQUEMA
const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);

// CREO MODELO
const User = mongoose.model("User", userSchema);

// EXPORTO EL MODELO
module.exports = User;

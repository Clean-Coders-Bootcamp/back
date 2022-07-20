"use strict";
const Schema = require("mongoose");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// CREO EL ESQUEMA
const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articule: [{ type: Schema.Types.ObjectId, ref: "Articule" }],
});
userSchema.plugin(uniqueValidator);

userSchema.statics.list = function () {
  const query = User.find();
  return query.exec();
};

// CREO MODELO
const User = mongoose.model("User", userSchema);

// EXPORTO EL MODELO
module.exports = User;

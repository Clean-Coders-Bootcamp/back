"use strict";
const { Schema, mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// CREO EL ESQUEMA
const userSchema = new Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blog: [{ type: Schema.Types.ObjectId, ref: "Articule" }],
});
userSchema.plugin(uniqueValidator);

// CREO MODELO
const User = mongoose.model("User", userSchema);

// EXPORTO EL MODELO
module.exports = User;

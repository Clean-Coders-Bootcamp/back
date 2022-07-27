"use strict";
const mongoose = require("mongoose");

// CREO EL ESQUEMA
const articuleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: String,
  date: String,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

});

// Creamos metodo estatico

articuleSchema.statics.list = function () {
  const query = Articule.find();
  return query.exec();
};

// CREO MODELO
const Articule = mongoose.model("Articule", articuleSchema);

// EXPORTO EL MODELO
module.exports = Articule;

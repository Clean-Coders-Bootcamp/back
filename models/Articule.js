"use strict";
const mongoose = require("mongoose");

// CREO EL ESQUEMA
const articuleSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

// Creamos metodo estatico

articuleSchema.statics.list = function(){
  const query = Articule.find();
  return query.exec();
}

// CREO MODELO
const Articule = mongoose.model("Articule", articuleSchema);

// EXPORTO EL MODELO
module.exports = Articule;

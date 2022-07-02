"use strict";

const mongoose = require("mongoose");

// definir un esquema)
const blogSchema = mongoose.Schema(
  {},
  {
    collection: "welldone",
  }
);

// metodo estatico del modelo
// blogSchema.statics.lista = function (filtros, skip, limit, select, sort) {

//     const query = Productospop.find(filtros);
//     query.skip(skip);
//     query.limit(limit);
//     query.select(select);
//     query.sort(sort);
//     return query.exec();
// };

// creo el modelo con ese esquema
const Welldone = mongoose.model("Welldone", blogSchema);

// opcional exportar modelo
module.exports = Welldone;

const mongoose = require("mongoose");

// Conexion a mongo

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión a MongoDB", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en la BD:", mongoose.connection.name);
});

mongoose.connect(process.env.MONGO_DB_URI); // si no existe la crea

module.exports = mongoose.connection;

"use strict";

const dotenv = require("dotenv");
// import fsPromise from 'fs/promises';
// import readline from 'readline';

// conexion a la base de datos
import dbConnection from "./connect_mongodb.js";
// const productoData = require('./productos.json')

// cargar modelos

import Welldone from "./models/Welldone";
import User from "./models/User";
import { resolve } from "path";

async function main() {
  // inicializar productos
  await initWelldone();

  // incializar usuarios
  await initUser();

  // desconectar la BD
  dbConnection.close();
}

async function initUser() {
  //borrar los usuarios existentes
  // const deleted = await Usuario.deleteMany();
  // console.log(`Eliminados ${deleted.deletedCount} usuarios`);

  //crear usuarios
  const users = await User.insertMany([
    {
      email: "admin@example.com",
      password: "1234",
    },
    {
      email: "user1@example.com",
      password: "1234",
    },
  ]);
  console.log(`Creados ${usuarios.length} usuarios`);
}

main().catch((err) => console.log("Hubo un error", err));

// async function initProductos() {
// //   // borrar todos los documentos de productos que haya en la coleccion
// //   const deleted = await Producto.deleteMany();
// //   console.log(`Eliminados ${deleted.deletedCount} productos`);

//   const data = await fsPromise.readFile('articulos.json', 'utf-8');
//   const productoData = JSON.parse(data);
//   // crear productos inciales

//   const productos = await Producto.insertMany(productoData);
//   console.log(`Creados ${productos.length} productos`);
// }

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    //conectar readline a la consola
    const rl = readline.createInterface({
      input: procces.stdin,
      output: process.stdout,
    });
    //hacemos pregunta
    rl.question(texto, (respuesta) => {
      rl.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}

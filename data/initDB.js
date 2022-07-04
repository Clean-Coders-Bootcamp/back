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
import Articule from "../models/Articule.js";

async function main() {
  // inicializar productos
  await initWelldone();

  // incializar usuarios
  await initUser();

  // inicializar articulos
  await initArticules();

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

async function initArticules() {
  //borrar los usuarios existentes
  // const deleted = await Usuario.deleteMany();
  // console.log(`Eliminados ${deleted.deletedCount} usuarios`);

  //crear usuarios
  const articules = await Articule.insertMany([
    {
      title: "los osos polares",
      content: "los osos polares son blancos, les gusta el frio y comen pescado.",
      author: "usuario1"
    },
   {
      title: "los planetas",
      content: "los planetas son grandes objetos que se encuentran en el espacio, la mayoria son rocosos otros son gaseosos.",
      author: "usuario2"
    },
     {
      title: "el ejercicio",
      content: "el ejercicio es una actividad fisica muy importante que nos ayuda a estar sanos en cuerpo y mente.",
      author: "usuario3"
    },
  ]);
  console.log(`Creados ${articules.length} articulos`);
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

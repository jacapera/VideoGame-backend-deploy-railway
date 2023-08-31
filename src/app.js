const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const server = express();
require('./db.js');

const { createServer } = require('http');
const { Server } = require("socket.io");
const httpServer = createServer(server);
const io = new Server(httpServer);
const path = require('path');
const socketsOnLine = [];

server.use(express.static(path.join(__dirname, 'views')));
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['https://zonked-fang-production.up.railway.app', 'http://localhost:3000']); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//                      SERVIDOR
// ---------------------------------------------------
io.on("connection", socket => {
/*
//   // console.log("Clientes conectados: ", io.engine.clientsCount);
//   // console.log("ID del socket conectado: ", socket.id);
//   // socket.on("disconnect", () => {
//   //   console.log("El socket " + socket.id + " se ha desconectando");
//   // });
//   // socket.conn.once("upgrade", () => {
//   //   console.log("Hemos pasado de HTTP Long-Polling a: ", socket.conn.transport.name);
//   // });

//   // Voy agregando los sockets que se van conectando
//   socketsOnLine.push(socket.id);

//   // Emision básica
//   // ---------------------------------------------
//   socket.emit("welcome", "Ahora estás conectado");
//   // Escuchando evento
//   socket.on("server", data => {
//     console.log(data);
//   });

//   // Emisión a todos
//   // --------------------------------------------------
//   io.emit("everyone", socket.id + " se ha conectado");

//   // Emisión a uno solo
//   //socket.on("last", (message) => {
//     // const lastSocket = socketsOnLine.pop();
//   //   const lastSocket = socketsOnLine[ socketsOnLine.length - 1 ];
//   //   io.to(lastSocket).emit("salute", message);
//   // });

//   // on, once, off
//   // socket.emit("on", "Holi");
//   // socket.emit("on", "Holi");
//   // socket.emit("once", "holi");
//   // socket.emit("once", "holi");

//   // socket.emit("off", "Holi");
//   // setTimeout(() => {
//   //   socket.emit("off", "Holi");
//   // }, 3000);
*/

  //             Broadcast de Eventos
  // -------------------------------------------------
  socket.on("circle position", (position) => {
    socket.broadcast.emit("move circle", position);
  });


// //   socket.connectedRoom = "";
// //   socket.on("connect to room", (room) => {

// //     socket.leave(socket.connectedRoom);
// //     switch (room) {
// //       case "room1":
// //         socket.join("room1");
// //         socket.connectedRoom = "room1";
// //         break;
// //       case "room2":
// //         socket.join("room2");
// //         socket.connectedRoom = "room2";
// //         break;
// //       case "room3":
// //         socket.join("room3");
// //         socket.connectedRoom = "room3";
// //         break;
// //       default:
// //         break;
// //     }
// //   });

// //   socket.on("message", message => {
// //     const room = socket.connectedRoom;
// //     io.to(room).emit("send message", {
// //       message,
// //       room
// //     })
// //   });

// });

// const teachers = io.of("teachers");
// const students = io.of("students");
// teachers.on("connection", socket => {
//   console.log(socket.id + "se ha conectado a la sala de profesores");
//   socket.on("send message", data => {
//     teachers.emit("message", data);
//   });
// });
// students.on("connection", socket => {
//   console.log(socket.id + "se ha conectado a la sala de estudiantes");
//   socket.on("send message", data => {
//     students.emit("message", data);
//   });
});


// io.on("connection", socket => {

//   socket.on("is connected", message => {
//     console.log(message);
//   });

// });


module.exports = httpServer;

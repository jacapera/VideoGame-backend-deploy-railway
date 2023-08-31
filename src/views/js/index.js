const socket = io();
/*
// function checkSocketStatus() {
  
//   console.log("Estado del socket: ", socket.connected);
// }

// socket.on("connect", () => {
//   console.log("El socket se ha CONECTADO: " + socket.id);
//   checkSocketStatus();
// });

// socket.on("connect_error", () => {
//   console.log("No  puede CONECTARME!!!:(");
// });

// socket.on("disconnect", () => {
//   console.log("El socket se ha DESCONECTADO: " + socket.id);
//   checkSocketStatus();
// });

// socket.io.on("reconnect_attempt", () => {
//   console.log("Estoy intentando RECONECTARME ")
// });

// socket.io.on("reconnect", () => {
//   console.log("!Me he vuelto a CONECTAR¡");
// });


// socket.on("welcome", (data) => {
//   console.log(data);
//   const text = document.querySelector("#text");
//   text.textContent = data;
// });

// const emitToServer = document.querySelector("#emit-to-server");
// emitToServer.addEventListener("click", () => {
//   socket.emit("server", "Hola, Servidor ");
// });

// socket.on("everyone", message => {
//   console.log(message);
// });

// const emitToLast = document.querySelector("#emit-to-last");
// emitToLast.addEventListener("click", () => {
//   socket.emit("last", "Hola Nuevo");
// });

// socket.on("salute", (message) => {
//   console.log(message);
// });

// // on, once, off
// socket.on("on", () => {
// console.log("Se emite varias veces");
// });

// socket.once("once", () => {
// console.log("Se emite una sola vez");
// });

// const listener = () => {
//   console.log("Se apaga el evento")
// }
// socket.on("off", listener);

// setTimeout(() => {
//   socket.off("off", listener);
// }, 2000);
*/

//                 BROADCAST
// --------------------------------------------------------------
const circle = document.querySelector("#circle");

const drawCircle = (position) => {
  circle.style.top = position.top;
  circle.style.left = position.left;
};

const drag = (event) => {
  // const clientX = event.clientX;
  // const clientY = event.clientY;
  const position = {
    top: event.clientY + "px",
    left: event.clientX + "px"
  };
  drawCircle(position);
  socket.volatile.emit("circle position", position);
};


document.addEventListener("mousedown", event => {
  document.addEventListener("mousemove", drag);
});

document.addEventListener("mouseup", event => {
  document.removeEventListener("mousemove", drag);
});

socket.on("move circle", position => {
  drawCircle(position);
});
// -------------------------------------------------



// const connectRoom1 = document.querySelector("#connectRoom1");
// const connectRoom2 = document.querySelector("#connectRoom2");
// const connectRoom3 = document.querySelector("#connectRoom3");

// connectRoom1.addEventListener("click", () => {
//   socket.emit("connect to room", "room1");
// });
// connectRoom2.addEventListener("click", () => {
//   socket.emit("connect to room", "room2");
// });
// connectRoom3.addEventListener("click", () => {
//   socket.emit("connect to room", "room3");
// });

// const sendMessage = document.querySelector("#sendMessage");
// sendMessage.addEventListener("click", () => {
//   const message = prompt("Escribe tu mensaje");
//   socket.emit("message", message);
// });


// socket.on("send message", (data) => {
//   const { room, message } = data;
//   const li = document.createElement("li");
//   li.textContent = message;

//   document.querySelector(`#${room}`).append(li);
// });



// const user = prompt("Escribe tu usuario");

// const profes = ["RetaxMaster", "juandc", "GNDX"];

// let socketNamespace, group;

// const chat = document.querySelector("#chat");
// const namespace = document.querySelector("#namespace");

// if(profes.includes(user)){
//   socketNamespace = io("/teachers");
//   group = "teachers";
// } else {
//   socketNamespace = io("/students");
//   group = "students";
// }

// socketNamespace.on("connect", () => {
//   namespace.textContent = group
// });

// const sendMessage = document.querySelector("#sendMessage");
// sendMessage.addEventListener("click", () => {
//   const message = prompt("Escribe tu mensaje: ");
//   socketNamespace.emit("send message", {
//     message,
//     user
//   });
// });

// socketNamespace.on("message", (messageData) => {
//   const { user, message } = messageData;
//   const li = document.createElement("li");
//   li.textContent = `${user}: ${message}`;

//   chat.append(li);
// });


// const send = document.querySelector("#send");
// const disconnect = document.querySelector("#disconnect");
// const reconnect = document.querySelector("#connect");

// send.addEventListener("click", () => {
//   if(socket.connected)
//     socket.emit("is connected", "¡Está conectado!");
// });

// disconnect.addEventListener("click", () => {
//   socket.disconnect();
// });

// reconnect.addEventListener("click", () => {
//   socket.connect();
// });
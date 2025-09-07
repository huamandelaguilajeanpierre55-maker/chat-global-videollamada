// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos (el frontend estará en /public)
app.use(express.static(path.join(__dirname, "public")));

// Chat global
io.on("connection", (socket) => {
  console.log("Un usuario se conectó");

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg); // Reenvía el mensaje a todos
  });

  socket.on("disconnect", () => {
    console.log("Un usuario salió");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

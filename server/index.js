const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // MUST match your frontend
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Received:", data);
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

// Create an express server
const app = express();
// Create an HTTP server
const server = http.Server(app);
// Attach socket.io to the server
const io = socketIO(server);

// Serve static assets from the 'public' directory
app.use(express.static("public"));

// Handle socket connections
io.on("connection", function(socket) {
  socket.on("size", function(size) {
    socket.broadcast.emit("onsize", size);
  });
  socket.on("color", function(color) {
    socket.broadcast.emit("oncolor", color);
  });
  socket.on("toolchange", function(tool) {
    socket.broadcast.emit("ontoolchange", tool);
  });
  socket.on("hamburger", function() {
    socket.broadcast.emit("onhamburger");
  });
  socket.on("mousedown", function(point) {
    socket.broadcast.emit("onmousedown", point);
  });
  socket.on("mousemove", function(point) {
    socket.broadcast.emit("onmousemove", point);
  });
  socket.on("undo", function() {
    socket.broadcast.emit("onundo");
  });
  socket.on("redo", function() {
    socket.broadcast.emit("onredo");
  });
});

// Set the port from the environment variable, default to 3000
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log(`Server has started at port ${port}`);
});

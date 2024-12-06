const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use the port from the environment (e.g., Cyclic) or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static("public")); // Make sure to put your `index.html` and other static files in the "public" folder

io.on("connection", (socket) => {
  console.log("A user connected");

  // Broadcast to all clients when a user connects
  io.emit("chatMessage", "A user connected");

  // Handle incoming messages
  socket.on("chatMessage", (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    io.emit("chatMessage", `[${timestamp}] ${msg}`);
  });

  // Handle user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    io.emit("chatMessage", "A user disconnected");
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

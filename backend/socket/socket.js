
// module.exports = { server, app, io, userSocketaMap };
const http = require("http");
// Imports Node's built-in HTTP module, used to create an HTTP server.

const express = require("express");
// Imports Express, a web framework for Node.js.

const app = express();
// Creates an Express application instance.

const { Server } = require("socket.io");
// Imports the Server class from the socket.io library.

const server = http.createServer(app);
// Creates an HTTP server using the Express app. This server will handle both HTTP and WebSocket (Socket.IO) traffic.

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
// Initializes a new Socket.IO server, attached to the HTTP server.
// The CORS option allows connections only from http://localhost:5173 (your frontend).

const userSocketaMap = {};
// Initializes an empty object to keep track of which user IDs are connected to which socket IDs.
const getReceiverSocketId=(receiver)=>{
  return userSocketaMap[receiver];
}
io.on("connection", (socket) => {
  // Listens for new client connections to the Socket.IO server.
  const userId = socket.handshake.query.userId;
  // Gets the userId from the connection query parameters (sent by the client when connecting).

  if (userId != undefined) {
    userSocketaMap[userId] = socket.id;
    // If a userId is provided, map this userId to the current socket's ID.
  }

  io.emit("getOnlineUsers", Object.keys(userSocketaMap));
  // Broadcasts the list of currently online user IDs to all connected clients.

  console.log("A user connected", userId, socket.id);
  // Logs the connection event to the server console.

  // socket.on("disconnect", () => {
  //   delete userSocketaMap[userId];
  //   console.log("A user disconnected", socket.id);
  // });
  socket.on("disconnect", () => {
  delete userSocketaMap[userId];
  io.emit("getOnlineUsers", Object.keys(userSocketaMap)); // ✅ Add this line
  console.log("A user disconnected", socket.id);
});
});

module.exports = { server, app, io, userSocketaMap, getReceiverSocketId };
// Exports the server, app, io instance, and userSocketaMap for use in other files.

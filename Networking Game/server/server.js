const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// -------------------------------------------------------------------------------------- //
// Server Erstellen

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

// -------------------------------------------------------------------------------------- //
// Eigentliches Backend

const rooms = {};
let playerList = [
  // Test Data
  { id: 1, name: "Player 1", room: "d", socket: null },
  { id: 2, name: "Player 2", room: "d", socket: null },
  { id: 3, name: "Player 3", room: "t", socket: null },
];
let i = 4;

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  // Event Raum Erstellung
  socket.on("createRoom", (roomName) => {
    console.log(`Raum erstellt: ${roomName}`);
    socket.join(roomName);
    rooms[roomName] = { users: [] };
    rooms[roomName].users.push(socket.id);
  });

  // Event Raum Beitreten
  socket.on("joinRoom", (roomName, callback) => {
    if (rooms[roomName]) {
      console.log(`Benutzer ${socket.id} ist Raum ${roomName} beigetreten`);
      socket.join(roomName);
      rooms[roomName].users.push(socket.id);
      callback({ success: true, message: "Raum erfolgreich beigetreten" });
    } else {
      console.log(`Der Raum ${roomName} existiert nicht`);
      callback({ success: false, message: "Der Raum existiert nicht" });
    }
  });

  // Game Raum Betreten
  socket.on("joinGameRoom", (roomName, callback) => {
    if (rooms[roomName]) {
      console.log(`Benutzer ${socket.id} ist Raum ${roomName} beigetreten`);
      socket.join(roomName);
      rooms[roomName].users.push(socket.id);

      // Fügen Sie einen neuen Spieler zur Liste hinzu
      const newPlayer = {
        id: i,
        name: null,
        room: roomName,
        socket: socket.id,
      };
      playerList.push(newPlayer);
      socket.to(roomName).emit(
        "playerList",
        playerList.filter((player) => player.room === roomName)
      );
      i++;

      callback({ success: true, message: "Raum erfolgreich beigetreten" });

      console.log(newPlayer);
    } else {
      console.log(`Der Raum ${roomName} existiert nicht`);
      callback({ success: false, message: "Der Raum existiert nicht" });
    }
  });

  // Senden Sie die aktuelle Spielerliste an alle Clients in einem bestimmten Raum
  socket.on("playerList", (roomName) => {
    console.log(playerList);
    console.log(roomName);
    socket.to(roomName).emit(
      "playerList",
      playerList.filter((player) => player.room === roomName)
    );
  });
});

// -------------------------------------------------------------------------------------- //
// Server Erstellen

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Sever is running on port http://localhost:${PORT}`);
});

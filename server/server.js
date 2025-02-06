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
  /*
  { id: 1, name: "Player 1", room: "d", socket: null, role: "Player", component: null, ready: "Ready", Team: "Team 1" },
  { id: 2, name: "Player 2", room: "d", socket: null, role: "Player", component: null, ready: "Ready", Team: "Team 2" },
  { id: 3, name: "Player 3", room: "t", socket: null, role: "Player", component: null, ready: "Ready", Team: "Team 1" },
  */
];

let componentList = [
  { id: 0, component: "PC 1", ip: "150.50.1.2 /24", mac: "78:23:4B:B0:A1:C7" },
  { id: 1, component: "PC 2", ip: "150.50.1.3 /24", mac: "D4:E1:8C:9E:3F:5A" },
  { id: 2, component: "PC 3", ip: "170.70.1.2 /24", mac: "00:50:56:A3:EF:82" },
  { id: 3, component: "PC 4", ip: "170.70.1.3 /24", mac: "F2:16:7A:8E:2D:45" },
  { id: 4, component: "Switch 1", ip: "-", mac: "6E:40:4C:2E:3B:FD" },
  { id: 5, component: "Switch 2", ip: "-", mac: "9C:B1:1E:D6:60:7B" },
  {
    id: 6,
    component: "Router 1 - A",
    ip: "150.50.1.1 /24",
    mac: "30:D0:E3:1F:A9:98",
  },
  {
    id: 7,
    component: "Router 1 - B",
    ip: "200.20.1.1 /24",
    mac: "00:50:56:A5:2B:1C",
  },
  {
    id: 8,
    component: "Router 2 - A",
    ip: "170.70.1.1 /24",
    mac: "EC:8F:AA:4A:58:17",
  },
  {
    id: 9,
    component: "Router 2 - B",
    ip: "200.20.1.2 /24",
    mac: "3C:8E:37:2E:F3:9B",
  },
];
let ID = 0;

// ----- Anfang der "Datenbank" ----- //
// Array um Datenpakete zwischen zu Speichern

let PC1 = [];
let PC2 = [];
let PC3 = [];
let PC4 = [];

let Switch1 = [];
let Switch2 = [];

let Router1 = [];
let Router2 = [];

// ----- Ende der "Datenbank" ----- //

let Words = [
  { id: 0, content: "Hund" },
  { id: 1, content: "Boot" },
  { id: 2, content: "Haus" },
  { id: 3, content: "Jack" },
  { id: 4, content: "Auto" },
  { id: 5, content: "Mond" },
  { id: 6, content: "Note" },
  { id: 7, content: "Park" },
  { id: 8, content: "Kuss" },
  { id: 9, content: "Lauf" },
  { id: 10, content: "Rand" },
  { id: 11, content: "Wolf" },
  { id: 12, content: "Zeit" },
  { id: 13, content: "Wurm" },
  { id: 14, content: "Keks" },
  { id: 15, content: "Zelt" },
  { id: 16, content: "Tanz" },
  { id: 17, content: "Club" },
  { id: 18, content: "Dorn" },
  { id: 19, content: "Korb" },
];

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  // Event Raum Erstellung
  socket.on("createRoom", (roomName) => {
    console.log(`Raum erstellt: ${roomName}`);
    socket.join(roomName);
    rooms[roomName] = { users: [], PTeam1: 0, PTeam2: 0 };
    rooms[roomName].users.push(socket.id);
    console.log(rooms);

    console.log(PC1.length);

    // Componenten Objekte für DB erstellen:
    const newPC1 = {
      id: PC1.length,
      room: roomName,
      team: "Team 1",
      task: null,
      Checked: false,
      messages: [],
    };

    PC1.push(newPC1);

    const newPC2 = {
      id: PC2.length,
      room: roomName,
      team: "Team 1",
      task: null,
      Checked: false,
      messages: [],
    };

    PC2.push(newPC2);

    const newPC3 = {
      id: PC3.length,
      room: roomName,
      team: "Team 2",
      task: null,
      Checked: false,
      messages: [],
    };

    PC3.push(newPC3);

    const newPC4 = {
      id: PC4.length,
      room: roomName,
      team: "Team 2",
      task: null,
      Checked: false,
      messages: [],
    };

    PC4.push(newPC4);

    const newSwitch1 = {
      id: Switch1.length,
      room: roomName,
      team: "Team 1",
      messages: [],
    };

    Switch1.push(newSwitch1);

    const newSwitch2 = {
      id: Switch2.length,
      room: roomName,
      team: "Team 2",
      messages: [],
    };

    Switch2.push(newSwitch2);

    const newRouter1 = {
      id: Router1.length,
      room: roomName,
      team: "Team 1",
      messages: [],
    };

    Router1.push(newRouter1);

    const newRouter2 = {
      id: Router2.length,
      room: roomName,
      team: "Team 2",
      messages: [],
    };

    Router2.push(newRouter2);
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
      let players = playerList.filter((player) => player.room === roomName);
      let lastindexofplayers = players.length - 1;
      if (
        players.length > 0 &&
        socket.id !== players[lastindexofplayers].socket &&
        players.length === players[lastindexofplayers].id
      ) {
        const newPlayer = {
          id: ID,
          name: "none",
          room: roomName,
          socket: socket.id,
          role: "Player",
          component: null,
          ready: "Not Ready",
          team: null,
        };

        playerList.push(newPlayer);
        socket.to(roomName).emit(
          "playerList",
          playerList.filter((player) => player.room === roomName)
        );

        //console.log(newPlayer); // Debugging Ausgabe
        ID++;
      } else if (
        players.length > 0 &&
        socket.id !== players[lastindexofplayers].socket
      ) {
        const newPlayer = {
          id: ID,
          name: "none",
          room: roomName,
          socket: socket.id,
          role: "Player",
          component: null,
          ready: "Not Ready",
          team: null,
        };

        playerList.push(newPlayer);
        socket.to(roomName).emit(
          "playerList",
          playerList.filter((player) => player.room === roomName)
        );

        //console.log(newPlayer); // Debugging Ausgabe
        ID++;
      } else if (players.length === 0) {
        const newPlayer = {
          id: ID,
          name: "none",
          room: roomName,
          socket: socket.id,
          role: "Host",
          component: null,
          ready: "Not Ready",
          team: null,
        };

        playerList.push(newPlayer);
        socket.to(roomName).emit(
          "playerList",
          playerList.filter((player) => player.room === roomName)
        );

        //console.log(newPlayer) // Debugging Ausgabe
        ID++;
      }
      callback({ success: true, message: "Raum erfolgreich beigetreten" });
    } else {
      console.log(`Der Raum ${roomName} existiert nicht`);
      callback({ success: false, message: "Der Raum existiert nicht" });
    }
  });

  // Senden Sie die aktuelle Spielerliste an alle Clients in einem bestimmten Raum
  socket.on("playerList", (roomName) => {
    //console.log(playerList); // Debugging Ausgabe
    //console.log(roomName); // Debugging Ausgabe
    socket.to(roomName).emit(
      "playerList",
      playerList.filter((player) => player.room === roomName)
    );
  });

  // Ändern des Benutzernamens
  socket.on("changeUsername", (roomName, name) => {
    //console.log("Username") // Debugging Ausgabe
    //console.log(roomName) // Debugging Ausgabe
    //console.log(name) // Debugging Ausgabe
    if (rooms[roomName]) {
      let players = playerList.find((player) => player.socket === socket.id);

      if (players) {
        players.name = name;
      } else {
        console.log("ChangeUsername - Player not found");
      }

      console.log(players);
    } else {
      console.log("ChangeUsername - Room not found!");
    }
  });

  // Username ans Spiel übergeben
  socket.on("getUsername", (roomName, callback) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.socket == socket.id && player.room == roomName
      );

      if (player) {
        callback({ success: true, message: player.name });
      } else {
        callback({ success: false, message: "" });
        console.log("getUsername - Player not Found");
      }
    } else {
      console.log("getUsername - Room not Found");
    }
  });

  // Netzwerk komponenten Selection vom  Client
  socket.on("selectComponent", (roomName, component) => {
    if (rooms[roomName]) {
      let players = playerList.find((player) => player.socket === socket.id);

      if (players) {
        players.component = component;
      } else {
        console.log("SelectComponent - Player not found");
      }
    } else {
      console.log("SelectComponent - Room not found");
    }
  });

  // Team Selection vom Client
  socket.on("selectTeam", (roomName, team) => {
    if (rooms[roomName]) {
      let player = playerList.find((player) => player.socket === socket.id);

      if (player) {
        player.team = team;
      } else {
        console.log("SelectTeam -  Player not found");
      }
    } else {
      console.log("SelectTeam - Room not found");
    }
  });

  // Ready Status Ändern
  socket.on("setReady", (roomName, readyStatus) => {
    //console.log("Ausgelöst"); // Debugging Ausgabe
    if (rooms[roomName]) {
      let players = playerList.find((player) => player.socket === socket.id); // Spieler ahand der Socket id in der playerList ermitteln

      //console.log(players); // Debugging Ausgabe

      if (players) {
        players.ready = readyStatus;
      } else {
        console.log("setReady - Player not Found");
      }
    } else {
      console.log("setReady - Room not Found");
    }
  });

  // Dem Host, Host rechte übermitteln
  socket.on("isHost", (roomName, callback) => {
    if (rooms[roomName]) {
      // Host ermitteln und Überprüfen ob der aktuelle Socket der Host des Aktuellen raumes ist
      let player = playerList.find(
        (player) =>
          player.room === roomName &&
          player.role === "Host" &&
          player.socket === socket.id
      );

      if (player) {
        callback({ success: true });
      } else {
        console.log("isHost - Player not Found");
      }
    } else {
      callback({ success: false });
      console.log("isHost - Room not Found");
    }
  });

  // Host Spiel Start
  socket.on("startGame", (roomName, callback) => {
    if (rooms[roomName]) {
      // Alle Spieler aus dem selben raum filtern
      let players = playerList.filter((player) => player.room === roomName);

      if (players) {
        let allPlayersReady = false;

        // Durch das Array Player loopen
        players.forEach((player) => {
          // Ready Status überprüfen
          if (
            player.ready === "Ready" &&
            player.component != null &&
            player.team != null
          ) {
            allPlayersReady = true;
          } else {
            allPlayersReady = false;
          }
          //console.log(player.ready) // Debug Ausgabe
          //console.log(player.component) // Debug Ausgabe
        });

        // Callback der Überprüfung
        if (allPlayersReady) {
          callback({ success: true, message: "All Players are Ready!" });
          io.to(roomName).emit("gameStart", true);
        } else {
          callback({
            success: false,
            message:
              "Not all Players are Ready or have Selected an Component or have Selected a Team",
          });
        }

        //console.log(allPlayersReady) // Debug Ausgabe
      }
    } else {
      callback({ success: false, message: "" });
    }
  });

  // Component dem Spieler übermitteln
  socket.on("getComponent", (roomName, callback) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        callback({ success: true, message: player.component });
      } else {
        console.log("getComponent - Player not Found"); // Error Ausgabe
      }
    } else {
      console.log("getComponent - Room not Found"); // Error Ausgabe
    }
  });

  // Team dem Spieler übermitteln
  socket.on("getTeam", (roomName, callback) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        let team = player.team;
        callback({ success: true, message: team });
      } else {
        console.log("getTeam - Player not found!");
      }
    } else {
      console.log("getTeam - Player not found!");
    }
  });

  // ----- Game - Backend Logik ----- //

  // Task für den PC vorschlagen
  socket.on("PCTask", (roomName, callback) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      let randnum = Math.floor(Math.random() * 20);
      let word = Words.find((word) => word.id === randnum);

      if (player) {
        let component = player.component;
        let team = player.team;

        if (component === "PC 1") {
          let PCArray1 = PC1.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray1) {
            let Checked = PCArray1.Checked;

            if (Checked === false) {
              callback({ success: true, message: word.content });
            } else {
              callback({
                success: false,
                message: "Das Word wurde bereits Festgesetzt.",
              });
            }
          } else {
            console.log("PCTask - PCArray1 not found!");
          }
        } else if (component === "PC 2") {
          let PCArray2 = PC2.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray2) {
            let Checked = PCArray2.Checked;

            if (Checked === false) {
              callback({ success: true, message: word.content });
            } else {
              callback({
                success: false,
                message: "Das Word wurde bereits Festgesetzt.",
              });
            }
          } else {
            console.log("PCTask - PCArray2 not found!");
          }
        } else if (component === "PC 3") {
          let PCArray3 = PC3.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray3) {
            let Checked = PCArray3.Checked;

            if (Checked === false) {
              callback({ success: true, message: word.content });
            } else {
              callback({
                success: false,
                message: "Das Word wurde bereits Festgesetzt.",
              });
            }
          } else {
            console.log("PCTask - PCArray3 not found!");
          }
        } else if (component === "PC 4") {
          let PCArray4 = PC4.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray4) {
            let Checked = PCArray4.Checked;

            if (Checked === false) {
              callback({ success: true, message: word.content });
            } else {
              callback({
                success: false,
                message: "Das Word wurde bereits Festgesetzt.",
              });
            }
          } else {
            console.log("PCTask - PCArray4 not found!");
          }
        } else {
          console.log("PCTask - Component not found!");
        }
      } else {
        console.log("PCTask - Player not found!");
      }
    } else {
      console.log("PCTask - Room not found!");
    }
  });

  // Task Accept vom PC
  socket.on("PCTaskAccept", (roomName, currentWord) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        let component = player.component;
        let team = player.team;

        if (component === "PC 1") {
          let PCArray1 = PC1.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray1) {
            PCArray1.task = currentWord;
            PCArray1.Checked = true;
          } else {
            console.log("PCTaskAccept - PCArray1 not found!");
          }
        } else if (component === "PC 2") {
          let PCArray2 = PC2.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray2) {
            PCArray2.task = currentWord;
            PCArray2.Checked = true;
          } else {
            console.log("PCTaskAccept - PCArray2 not found!");
          }
        } else if (component === "PC 3") {
          let PCArray3 = PC3.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray3) {
            PCArray3.task = currentWord;
            PCArray3.Checked = true;
          } else {
            console.log("PCTaskAccept - PCArray3 not found!");
          }
        } else if (component === "PC 4") {
          let PCArray4 = PC4.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (PCArray4) {
            PCArray4 = currentWord;
            PCArray4.Checked = true;
          } else {
            console.log("PCTaskAccept - PCArray4 not found!");
          }
        } else {
          console.log("PCTaskAccept - Component not found!");
        }
      } else {
        console.log("PCTaskAccept - Player not found!");
      }
    } else {
      console.log("PCTaskAccept - Room not found!");
    }
  });

  // PC Data Packet anfragen
  socket.on("GetDataPacket", (roomName, callback) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        if (player.component === "PC 1") {
          let PCArray1 = PC1.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray1) {
            callback({ success: true, message: PCArray1.messages[0] });
          } else {
            console.log("GetDataPacket - PCArray1 not found!");
          }
        } else if (player.component === "PC 2") {
          let PCArray2 = PC2.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray2) {
            callback({ success: true, message: PCArray2.messages[0] });
          } else {
            console.log("GetDataPacket - PCArray2 not found!");
          }
        } else if (player.component === "PC 3") {
          let PCArray3 = PC3.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray3) {
            callback({ success: true, message: PCArray3.messages[0] });
          } else {
            console.log("GetDataPacket - PCArray3 not found!");
          }
        } else if (player.component === "PC 4") {
          let PCArray4 = PC4.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray4) {
            callback({ success: true, message: PCArray4.messages[0] });
          } else {
            console.log("GetDataPacket - PCArray4 not found!");
          }
        }
      } else {
        console.log("GetDataPacket - Player not found!");
      }
    } else {
      console.log("GetDataPacket - Room not found!");
    }
  });

  // PC to Switch Array
  socket.on("PCtoSwitch", (roomName, Packet) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        // Ermittlung des Teams
        let team = player.team;

        //console.log(player) // Debugging Ausgabe

        let secondplayer = playerList.find(
          (player) =>
            player.room === roomName &&
            player.team === team &&
            (player.component === "Switch 1" || player.component === "Switch 2")
        );

        if (secondplayer && secondplayer.component === "Switch 1") {
          //console.log(secondplayer); // Debugging Ausgabe
          //console.log(Packet); // Debugging Ausgabe

          // Aktuelles Switch Obejekt anhand des Raumes bzw. teams bestimmen
          let SwitchArray1 = Switch1.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (SwitchArray1) {
            //console.log(SwitchArray1); // Debugging Ausgabe

            // neues Objekt IP-Header erstellen
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            // neues Objekt MAC-Header erstellen
            let MACHeader = {
              id: SwitchArray1.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            // neues Objekt in das Array Messages Pushen
            SwitchArray1.messages.push(MACHeader);
          }
        } else if (secondplayer && secondplayer.component === "Switch 2") {
          let SwitchArray2 = Switch2.find(
            (DB) => DB.room === roomName && DB.team === team
          );

          if (SwitchArray2) {
            //console.log(SwitchArray2) // Debugging Ausgabe

            // neues Objekt IP-Header erstellen
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            // neues Objekt MAC-Header erstellen
            let MACHeader = {
              id: SwitchArray2.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            // neues Objekt in das Array Messages Pushen
            SwitchArray2.messages.push(MACHeader);
          }
        } else {
          console.log("PCtoSwitch - SecondPlayer not found!");
        }
      } else {
        console.log("PCtoSwitch - Player not found!");
      }
    } else {
      console.log("PCtoSwitch - Room not found!");
    }
  });

  // Switch Task Anfrage
  socket.on("SwitchTask", (roomName, callback) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        if (player.component === "Switch 1") {
          // Passendes Switch Array für den Raum finden
          let SwitchArray1 = Switch1.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (SwitchArray1) {
            console.log(SwitchArray1.messages[0]);
            callback({ success: true, message: SwitchArray1.messages[0] });
          }
        } else if (player.component === "Switch 2") {
          // Passendes Switch Array für den Raum finden
          let SwitchArray2 = Switch2.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (SwitchArray2) {
            callback({ success: true, message: SwitchArray2.messages[0] });
          }
        }
      } else {
        console.log("SwitchTask - Player not found!");
      }
    } else {
      console.log("SwitchTask - Room not found!");
    }
  });

  // Packet vom Switch zum PC,Router Weiterleiten
  socket.on("SwitchToComponents", (roomName, Port, Packet) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        if (Port === "1/1") {
          let RouterArray1 = Router1.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (RouterArray1) {
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            let MACHeader = {
              id: RouterArray1.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            RouterArray1.messages.push(MACHeader);
          } else {
            console.log("SwitchToComponents - RouterArray1 not found!");
          }
        } else if (Port === "1/2") {
          let PCArray1 = PC1.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray1) {
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            let MACHeader = {
              id: PCArray1.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            PCArray1.messages.push(MACHeader);
          } else {
            console.log("SwitchToComponents - PCArray1 not found!");
          }
        } else if (Port === "1/3") {
          let PCArray2 = PC2.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray2) {
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            let MACHeader = {
              id: PCArray2.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            PCArray2.messages.push(MACHeader);
          } else {
            console.log("SwitchToComponents - PCArray2 not found!");
          }
        } else if (Port === "2/1") {
          let RouterArray2 = Router2.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (RouterArray2) {
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            let MACHeader = {
              id: RouterArray2.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            RouterArray2.messages.push(MACHeader);
          } else {
            console.log("SwitchToComponents - RouterArray2 not found!");
          }
        } else if (Port === "2/2") {
          let PCArray3 = PC3.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray3) {
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            let MACHeader = {
              id: PCArray3.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            PCArray3.messages.push(MACHeader);
          } else {
            console.log("SwitchToComponents - PCArray3 not found!");
          }
        } else if (Port === "2/3") {
          let PCArray4 = PC4.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (PCArray4) {
            let IPHeader = {
              sourceIP: Packet.IPHeader.sourceIP,
              sourceMAC: Packet.IPHeader.sourceMAC,
              destIP: Packet.IPHeader.destIP,
              destMAC: Packet.IPHeader.destMAC,
              content: Packet.IPHeader.encryptedContent,
            };

            let MACHeader = {
              id: PCArray4.messages.length,
              sourceMAC: Packet.sourceMAC,
              destMAC: Packet.destMAC,
              IPHeader: IPHeader,
            };

            PCArray4.messages.push(MACHeader);
          } else {
            console.log("SwitchToComponents - PCArray4 not found!");
          }
        } else {
          console.log("SwitchToComponents - Port not found!");
        }
      } else {
        console.log("SwitchToComponents - Player not found!");
      }
    } else {
      console.log("SwitchToComponents - Room not found!");
    }
  });

  // Letzte Task Löschen aus dem Array Messages
  socket.on("SwitchTaskDone", (roomName) => {
    if (rooms[roomName]) {
      let player = playerList.find(
        (player) => player.room === roomName && player.socket === socket.id
      );

      if (player) {
        if (player.component === "Switch 1") {
          let SwitchArray1 = Switch1.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (SwitchArray1) {
            SwitchArray1.messages.splice(0, 1);

            SwitchArray1.messages.forEach((item, index) => {
              item.id = index;
            });
          }
        } else if (player.component === "Switch 2") {
          let SwitchArray2 = Switch2.find(
            (DB) => DB.room === roomName && DB.team === player.team
          );

          if (SwitchArray2) {
            SwitchArray2.messages.splice(0, 1);

            SwitchArray2.messages.forEach((item, index) => {
              item.id = index;
            });
          }
        }
      } else {
        console.log("SwitchTaskDone - Player not found!");
      }
    } else {
      console.log("SwitchTaskDone - Room not found!");
    }
  });

  // Wenn ein Spieler die Verbindung trennt
  socket.on("disconnect", () => {
    // Den Spieler anhand der Socket id ermitteln und in der Variable disconnectedPlayer speichern
    let disconnectedPlayer = playerList.find(
      (player) => player.socket === socket.id
    );
    if (disconnectedPlayer) {
      let index = playerList.indexOf(disconnectedPlayer); // Array Index des Spielers im Array Playlist
      playerList.splice(index, 1); // Spieler aus der playerlist entfernen
      console.log(`Spieler ${socket.id} hat die Verbindung getrennt`); // Ausgabe des Verlassens in die Konsole des Servers

      if (disconnectedPlayer.role === "Host") {
        console.log("Host Left game"); // Test Ausgabe
        // Alle Spieler aus dem Array playerList filtern die im selben raum mit dem Host sind
        let players = playerList.filter(
          (player) => player.room === disconnectedPlayer.room
        );
        //console.log(players.length); // Test Ausgabe

        if (players) {
          let player = players.find((player) => player.role === "Player");

          if (player) {
            // Den ermittelten Spieler zum Host machen
            player.role = "Host";
          } else {
            console.log("Disconnected - Player not Found"); // Error Ausgabe
          }
        } else {
          console.log("Disconnected - Players not Found"); // Error Ausgabe
        }
      }
    }
  });
});

// -------------------------------------------------------------------------------------- //
// Server Erstellen

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Sever is running on port http://localhost:${PORT}`);
});

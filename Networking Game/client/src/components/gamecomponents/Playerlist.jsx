import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Playerlist = ({ room }) => {
  const [playerlist, setPlayerlist] = useState([]);

  socket.emit("playerList", room);

  useEffect(() => {
    console.log("hier");
    const handler = (playerList) => {
      console.log("Playerlist Data");
      setPlayerlist(playerList.filter((player) => player.room === room));
    };
    socket.on("playerList", handler);

    // Cleanup-Funktion
    return () => {
      socket.off("playerList", handler);
    };
  });

  return (
    <div>
      <h1>PlayerList</h1>
      <ul>
        {playerlist.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playerlist;

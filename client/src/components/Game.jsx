import "./Game.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import socket from "./socket";
import Lobbie from "./gamecomponents/lobbie/Lobbie";
import Gamehandler from "./gamecomponents/game/GameHandler";

const Game = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [startGame, setStartGame] = useState(false);

  // URL / Room Name Filtern
  const location = useLocation();
  const url = location.pathname;
  const parts = url.split("/");
  const name = parts[parts.length - 1];

  // Raum Beitreten
  useEffect(() => {
    socket.emit("joinGameRoom", name, (response) => {
      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage("");
      }
    });
  }, []);

  // Start Game
  useEffect(() => {
    socket.on("gameStart", (message) => {
      setStartGame(message);
    });
  });

  return (
    <div>
      <h1>Game - Room: {name}</h1>
      {/*
      <p>{location.pathname}</p>
      <p>{name}</p>
  */}
      {errorMessage && <p>{errorMessage}</p>}
      {!startGame && <Lobbie room={name} />}
      {startGame && <Gamehandler room={name} />}
    </div>
  );
};

export default Game;

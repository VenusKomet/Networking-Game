import "./StartGame.css";
import React, { useState, useEffect } from "react";
import socket from "../../socket";

const StartGame = ({ room }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const StartGameHandler = () => {
    socket.emit("startGame", room, (callback) => {
      if (callback.success) {
        setErrorMessage(callback.message);
      } else {
        setErrorMessage(callback.message);
      }
    });
  };

  return (
    <div>
      <button onClick={StartGameHandler}>Start Game</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default StartGame;

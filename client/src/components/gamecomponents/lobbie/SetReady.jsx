import "./SetReady.css";
import React, { useState } from "react";
import socket from "../../socket";

const SetReady = ({ roomName }) => {
  const [ready, setReady] = useState("Ready");

  const toggleReadyState = () => {
    //console.log("ToggleReadyState - Error") // Debugging Ausgabe
    if (ready === "Not Ready") {
      setReady("Ready");
      socket.emit("setReady", roomName, ready);
    } else {
      setReady("Not Ready");
      socket.emit("setReady", roomName, ready);
    }
  };

  const ButtonStyle = {
    backgroundColor: ready === "Not Ready" ? "#c11e1e" : "#32c11e",
  };

  return (
    <div>
      <button
        style={ButtonStyle}
        onClick={toggleReadyState}
        className="Ready-Button"
      >
        {ready}
      </button>
    </div>
  );
};

export default SetReady;

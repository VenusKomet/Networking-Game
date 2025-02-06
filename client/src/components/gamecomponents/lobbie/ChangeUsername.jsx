import React, { useState } from "react";
import socket from "../../socket";
import "./ChangeUsername.css";

const Button = ({ roomName, username }) => {
  const ChangeUsername = () => {
    socket.emit("changeUsername", roomName, username);
  };

  return (
    <div>
      <button className="ChangeUsername" onClick={ChangeUsername}>
        Change
      </button>
    </div>
  );
};

const ChangeUsername = ({ roomName }) => {
  const [Username, setUsername] = useState("");

  return (
    <div>
      <h2>Change Username</h2>
      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
        className="UsernameInput"
      />
      {Username && <Button roomName={roomName} username={Username} />}
    </div>
  );
};

export default ChangeUsername;

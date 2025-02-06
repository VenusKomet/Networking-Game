import "./Lobbie.css";
import React, { useState, useEffect } from "react";
import Playerlist from "./Playerlist";
import ChangeUsername from "./ChangeUsername";
import SelectComponent from "./SelectComponent";
import SetReady from "./SetReady";
import StartGame from "./StartGame";
import socket from "../../socket";
import SelectTeam from "./SelectTeam";

const Lobbie = ({ room }) => {
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.emit("isHost", room, (response) => {
      if (response.success == true) {
        setIsHost(true);
      } else {
        setIsHost(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="Lobbie">
        <ChangeUsername roomName={room} />
        <SelectComponent roomName={room} />
        <SelectTeam roomName={room} />
        <SetReady roomName={room} />

        {isHost == true && <StartGame room={room} />}
      </div>
      <hr></hr>
      <Playerlist room={room} />
    </div>
  );
};

export default Lobbie;

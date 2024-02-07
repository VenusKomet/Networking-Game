import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import CreateRoom from "./lowercomponents/CreateRoom";
import JoinRoom from "./lowercomponents/JoinRoom";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <CreateRoom />
      <JoinRoom />
      <p>{message}</p>
    </div>
  );
};

export default Home;
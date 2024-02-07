import './CreateRoom.css'
import React from 'react'
import { useState } from 'react'
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3001");

const Button = ({ roomName }) => {
    const navigate = useNavigate();
  
    const createRoom = () => {
      socket.emit("createRoom", roomName);
  
      navigate(`/room/${roomName}`);
    };
  
    return (
      <div>
        <button className="Button" onClick={createRoom}>
          Create
        </button>
      </div>
    );
};
  

const CreateRoom = () => {

    const [roomName, setRoomName] = useState('')

  return (
    <div>
        <p>Create Room:</p>
        <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="Create"
        />
        {roomName && <Button roomName={roomName} />}
    </div>
  )
}

export default CreateRoom
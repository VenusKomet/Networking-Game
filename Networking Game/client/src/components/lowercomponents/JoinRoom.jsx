import './JoinRoom.css'
import React from 'react'
import { useState } from 'react'
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3001");

const Button = ({ roomName }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    const joinRoom = () => {
        socket.emit('joinRoom', roomName, (response) => {
            if (!response.success) {
                setErrorMessage(response.message)
            }
            else {
                navigate(`/room/${roomName}`);
                setErrorMessage('')
            }
        })
      };

    return (
        <div>
            <button className='Button' onClick={joinRoom}>
                Join
            </button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

const JoinRoom = () => {

    const [roomName, setRoomName] = useState('')

  return (
    <div className="JoinRoom">
        <p>Join Room:</p>
        <input 
        type='text'
        placeholder='Enter room name'
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className='Join'
        />
        {roomName && <Button roomName={roomName} />}
    </div>
  )
}

export default JoinRoom
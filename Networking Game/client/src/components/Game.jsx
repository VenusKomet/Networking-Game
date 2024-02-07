import './Game.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client'
import Playerlist from './gamecomponents/Playerlist';

const socket = io("http://localhost:3001");

const Game = () => {

    const [errorMessage, setErrorMessage] = useState('')

    // URL / Room Name Filtern
    const location = useLocation();
    const url = location.pathname;
    const parts = url.split('/');
    const name = parts[parts.length - 1]

    // Raum Beitreten
    useEffect(() => {
        socket.emit('joinGameRoom', name, (response) => {
            if (!response.success) {
                setErrorMessage(response.message)
            }
            else {
                setErrorMessage('')
            }
        })
    }, [])
        


  return (
    <div>
        <h1>Game</h1>
        <p>{location.pathname}</p>
        <p>{name}</p>
        {errorMessage && <p>{errorMessage}</p>}

        <Playerlist room={ name }/>
    </div>
  )
}

export default Game
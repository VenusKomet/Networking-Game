import "./GameHandler.css"
import React, { useEffect, useState } from 'react'

import Router_Comp from "./Router"
import PC_Comp from "./PC"
import Switch_Comp from "./Switch"

import socket from "../../socket"

const GameHandler = ({room}) => {

  const [component, setComponent] = useState("")

  const updateComponent = (response) => {
    if (response) {
      const parts = response.message.split(" ")
      const newcomponent = parts[0]

      setComponent(newcomponent)
    }
  }


  useEffect(() => {
    socket.emit("getComponent", room, updateComponent)
  }, [])
  
  return (
    <div className="GameHandler">
        {component === "Router" && <Router_Comp room={room}/>}
        {component === "Switch" && <Switch_Comp room={room}/>}
        {component === "PC" && <PC_Comp room={room}/>}
    </div>
  )
}

export default GameHandler
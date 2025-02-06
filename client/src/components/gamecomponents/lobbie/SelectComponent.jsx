import React, { useState } from "react";
import socket from "../../socket";
import "./SelectComponent.css";

const RouterDropdown = ({ roomName }) => {
  const [isOpenRouter, setIsOpenRouter] = useState(false);

  const toggleRouter = () => {
    setIsOpenRouter(!isOpenRouter);
  };

  const SetRouter = (id) => {
    //console.log(`Router${id}`) // Debugging Ausgabe
    let component = `Router ${id}`;
    socket.emit("selectComponent", roomName, component);
  };

  return (
    <div>
      <button onClick={toggleRouter} className="dropdown-item">
        Router
      </button>
      {isOpenRouter && (
        <div>
          <button
            id="router1"
            className="dropdown-item2"
            onClick={() => SetRouter(1)}
          >
            Router 1
          </button>
          <button
            id="router2"
            className="dropdown-item2"
            onClick={() => SetRouter(2)}
          >
            Router 2
          </button>
        </div>
      )}
    </div>
  );
};

const SwitchDropdown = ({ roomName }) => {
  const [isOpenSwitch, setIsOpenSwitch] = useState(false);

  const toggleSwitch = () => {
    setIsOpenSwitch(!isOpenSwitch);
  };

  const SetSwitch = (id) => {
    let component = `Switch ${id}`;
    socket.emit("selectComponent", roomName, component);
  };

  return (
    <div>
      <button onClick={toggleSwitch} className="dropdown-item">
        Switch
      </button>
      {isOpenSwitch && (
        <div>
          <button className="dropdown-item2" onClick={() => SetSwitch(1)}>
            Switch 1
          </button>
          <button className="dropdown-item2" onClick={() => SetSwitch(2)}>
            Switch 2
          </button>
        </div>
      )}
    </div>
  );
};

const PCDropdown = ({ roomName }) => {
  const [isOpenPC, setIsOpenPC] = useState(false);

  const togglePC = () => {
    setIsOpenPC(!isOpenPC);
  };

  const SetPC = (id) => {
    let component = `PC ${id}`;
    socket.emit("selectComponent", roomName, component);
  };

  return (
    <div>
      <button onClick={togglePC} className="dropdown-item">
        PC
      </button>
      {isOpenPC && (
        <div>
          <button className="dropdown-item2" onClick={() => SetPC(1)}>
            PC 1
          </button>
          <button className="dropdown-item2" onClick={() => SetPC(2)}>
            PC 2
          </button>
          <button className="dropdown-item2" onClick={() => SetPC(3)}>
            PC 3
          </button>
          <button className="dropdown-item2" onClick={() => SetPC(4)}>
            PC 4
          </button>
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Select Component
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            <li>
              <RouterDropdown roomName={room} />
            </li>
            <li>
              <SwitchDropdown roomName={room} />
            </li>
            <li>
              <PCDropdown roomName={room} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const SelectComponent = ({ roomName }) => {
  return (
    <div className="SelectComponent">
      <Dropdown room={roomName} />
    </div>
  );
};

export default SelectComponent;

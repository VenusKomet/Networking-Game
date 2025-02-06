import "./SelectTeam.css";
import React, { useState } from "react";
import socket from "../../socket";

const SelectTeam = ({ roomName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTeamDropdown = () => {
    setIsOpen(!isOpen);
  };

  const SetTeam1 = () => {
    socket.emit("selectTeam", roomName, "Team 1");
  };

  const SetTeam2 = () => {
    socket.emit("selectTeam", roomName, "Team 2");
  };

  return (
    <div className="Teamdropdown">
      <button onClick={toggleTeamDropdown} className="Teamdropdown-toggle">
        Select Team
      </button>
      {isOpen && (
        <div className="Teamdropdown-menu">
          <ul className="Teamdropdown-list">
            <li>
              <button onClick={SetTeam1} className="Teamdropdown-item-1">
                Team 1
              </button>
            </li>
            <li>
              <button onClick={SetTeam2} className="Teamdropdown-item-2">
                Team 2
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectTeam;

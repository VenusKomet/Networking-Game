import "./Playerlist.css";
import React, { useState, useEffect, Fragment } from "react";
import socket from "../../socket";

const Playerlist = ({ room }) => {
  const [playerlist, setPlayerlist] = useState([]);

  socket.emit("playerList", room);

  useEffect(() => {
    //console.log("hier"); // Debugging Ausgabe
    const handler = (playerList) => {
      //console.log("Playerlist Data"); //Debugging Ausgabe
      setPlayerlist(playerList.filter((player) => player.room === room));
    };
    socket.on("playerList", handler);

    // Cleanup-Funktion
    return () => {
      socket.off("playerList", handler);
    };
  }, []);

  return (
    <div>
      <h1>PlayerList</h1>
      <table className="Playerlisttable">
        <thead>
          <tr>
            {/* <th className="Playerlisthead">id</th> */}
            <th className="Playerlisthead">Rolle</th>
            <th className="Playerlisthead">Name</th>
            <th className="Playerlisthead">Component</th>
            <th className="Playerlisthead">Team</th>
            <th className="Playerlisthead">Ready Status</th>
          </tr>
        </thead>
        <tbody>
          {playerlist.map((player) => (
            <Fragment key={player.id}>
              <tr>
                {/*<td className="Playerlistdata">{player.id}</td>*/}
                <td className="Playerlistdata">{player.role}</td>
                <td className="Playerlistdata">{player.name}</td>
                <td className="Playerlistdata">{player.component}</td>
                <td className="Playerlistdata">{player.team}</td>
                <td className="Playerlistdata">{player.ready}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Playerlist;

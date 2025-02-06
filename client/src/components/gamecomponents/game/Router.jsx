import "./Router.css";
import React, { useEffect, useState, Fragment } from "react";
import socket from "../../socket";

const Router = ({ room }) => {
  // Username
  const [Username, setUsername] = useState("");

  // Component
  const [Component, setComponent] = useState("");

  // Team Punkte
  const [maxPoints, setMaxPoints] = useState(30);
  const [team1Points, setTeam1Points] = useState(15);
  const [team2Points, setTeam2Points] = useState(15);

  // Liste aller IP / MAC Addressen
  const Addresses = [
    {
      id: 0,
      component: "PC 1",
      ip: "150.50.1.2 /24",
      mac: "78:23:4B:B0:A1:C7",
    },
    {
      id: 1,
      component: "PC 2",
      ip: "150.50.1.3 /24",
      mac: "D4:E1:8C:9E:3F:5A",
    },
    {
      id: 2,
      component: "PC 3",
      ip: "170.70.1.2 /24",
      mac: "00:50:56:A3:EF:82",
    },
    {
      id: 3,
      component: "PC 4",
      ip: "170.70.1.3 /24",
      mac: "F2:16:7A:8E:2D:45",
    },
    { id: 4, component: "Switch 1", ip: "-", mac: "-" },
    { id: 5, component: "Switch 2", ip: "-", mac: "-" },
    {
      id: 6,
      component: "Router 1 - A",
      ip: "150.50.1.1 /24",
      mac: "30:D0:E3:1F:A9:98",
    },
    {
      id: 7,
      component: "Router 1 - B",
      ip: "200.20.1.1 /24",
      mac: "00:50:56:A5:2B:1C",
    },
    {
      id: 8,
      component: "Router 2 - A",
      ip: "170.70.1.1 /24",
      mac: "EC:8F:AA:4A:58:17",
    },
    {
      id: 9,
      component: "Router 2 - B",
      ip: "200.20.1.2 /24",
      mac: "3C:8E:37:2E:F3:9B",
    },
  ];

  // Server Anfrage des Usernames
  useEffect(() => {
    socket.emit("getUsername", room, (response) => {
      if (response.success == true) {
        setUsername(response.message);
      } else {
        setUsername(response.message);
      }
    });
  });

  // Server Anfrage der Component
  useEffect(() => {
    socket.emit("getComponent", room, (response) => {
      if (response.success) {
        setComponent(response.message);
      } else {
        setComponent(response.message);
      }
    });
  });

  return (
    <div>
      <div>
        <div className="comp-Router-pic-frame">
          <img
            src="..\src\components\grafiken\Router_3D.png"
            className="comp-Router-pic"
          ></img>
        </div>
        <a className="game-Router-Username">{Username}</a>
        <a className="game-Router-Component">{Component}</a>
        <hr></hr>
      </div>

      <div className="game-Router-UserInterface">
        {/* Aufgaben Feld */}

        <div className="game-Router-Aufgabe">
          <a>Sende folgendes Wort:</a>
        </div>

        {/* IP Header */}

        <div className="game-Router-Formular">
          <a>IP-Header:</a>
          <br></br>
          <div className="game-Router-Formular-Inputs">
            <div className="game-Router-Formular-container">
              <form className="game-Router-Formular-source">
                <p>Source:</p>
                <label htmlFor="ipAdresse">IP-Adresse:</label>
                <br />
                <input type="text" name="ipAdress" id="ipAdress" />
                <br />
                <label htmlFor="ipAdresse">MAC-Adresse:</label>
                <br />
                <input type="text" name="ipAdress" id="ipAdress" />
                <br />
              </form>
              <form className="game-Router-Formular-dest">
                <p>Destination:</p>
                <label htmlFor="ipAdresse">IP-Adresse:</label>
                <br />
                <input type="text" name="ipAdress" id="ipAdress" />
                <br />
                <label htmlFor="ipAdresse">MAC-Adresse:</label>
                <br />
                <input type="text" name="ipAdress" id="ipAdress" />
                <br />
              </form>
            </div>
            <form>
              <label htmlFor="ipAdresse">Verschlüsselter Inhalt:</label>
              <br />
              <input type="text" name="ipAdress" id="ipAdress" />
              <br />
            </form>
          </div>
          <button className="game-Router-confirm-formular">Done</button>
        </div>

        {/* Address Tabelle */}

        <div className="game-Router-Table-Container">
          <a>Address-Tabelle:</a>
          <br></br>
          <table className="game-Router-Table">
            <thead className="game-Router-Table-Head">
              <tr>
                <th>Komponente</th>
                <th>IP-Adresse</th>
                <th>MAC-Adresse</th>
              </tr>
            </thead>
            <tbody className="game-Router-Table-Body">
              {Addresses.map((component) => (
                <Fragment key={component.id}>
                  <tr>
                    <td>{component.component}</td>
                    <td>{component.ip}</td>
                    <td>{component.mac}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br></br>

      {/* Game Info Panel */}

      <div className="game-Router-info-container">
        {/* Map / Real Overview */}

        <div className="game-Router-Realtime-Overview">
          <a>Realtime Overview:</a>
          <br></br>
          <div className="game-Router-Team-Progress-1-description">
            <a>Team 1</a>
          </div>
          <br></br>
          <div className="game-Router-Team-Progress-1-container">
            <progress
              className="game-Router-Team-Progress-1"
              value={team1Points}
              max={maxPoints}
            ></progress>
            <span className="game-Router-Team-Progress-1-State">
              {<a>{team1Points}</a>} /{<a>{maxPoints}</a>} Punkte
            </span>
          </div>
          <br></br>
          <div className="game-Router-Team-Progress-2-description">
            <a>Team 2</a>
          </div>
          <br></br>
          <div className="game-Router-Team-Progress-2-container">
            <progress
              className="game-Router-Team-Progress-2"
              value={15}
              max={maxPoints}
            ></progress>
            <span className="game-Router-Team-Progress-2-State">
              {<a>{team2Points}</a>} /{<a>{maxPoints}</a>} Punkte
            </span>
          </div>
          <br></br>
          <hr></hr>
          <div className="game-Router-Scenes-RO">
            <div className="game-Router-Scene-Team-1">
              <div className="game-Router-Scene-PC1">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 1</a>
              </div>
              <div className="game-Router-Scene-PC2">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 2</a>
              </div>
              <div className="game-Switch-Scene-Switch1">
                <img src="..\src\components\grafiken\Switch_3D.png"></img>
                <a>Switch 1</a>
              </div>
              <div className="game-Router-Scene-Router1">
                <img src="..\src\components\grafiken\Router_3D.png"></img>
                <a>Router 1</a>
              </div>
              <div className="game-Router-Scene-Line-PC1-Switch1"></div>
              <div className="game-Router-Scene-Line-PC2-Switch1"></div>
              <div className="game-Router-Scene-Line-Switch1-Router1"></div>
            </div>
            <div>
              <div className="game-Switch-Scene-Line-Router1-Router2"></div>
            </div>
            <div className="game-Router-Scene-Team-2">
              <div className="game-Router-Scene-PC3">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 3</a>
              </div>
              <div className="game-Router-Scene-PC4">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 4</a>
              </div>
              <div className="game-Router-Scene-Switch2">
                <img src="..\src\components\grafiken\Switch_3D.png"></img>
                <a>Switch 2</a>
              </div>
              <div className="game-Router-Scene-Router2">
                <img src="..\src\components\grafiken\Router_3D.png"></img>
                <a>Router 2</a>
              </div>
              <div className="game-Router-Scene-Line-PC3-Switch2"></div>
              <div className="game-Router-Scene-Line-PC4-Switch2"></div>
              <div className="game-Router-Scene-Line-Switch2-Router2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Router;

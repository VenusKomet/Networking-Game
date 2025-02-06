import "./Switch.css";
import React, { useEffect, useState, Fragment } from "react";
import socket from "../../socket";

const Switch = ({ room }) => {
  // Username
  const [Username, setUsername] = useState("");

  // Component
  const [Component, setComponent] = useState("");

  // Team
  const [team, setTeam] = useState("");

  // Header-Data vom Backend
  const [headerData, setHeaderData] = useState([]);

  // Port Weiterleitung
  const [portOptions, setPortOptions] = useState([]);
  const [port, setPort] = useState([]);

  // MAC-Header
  const [MACheaderOptions, setMACheaderOptions] = useState([]);
  const [sourceMACheader, setSourceMACheader] = useState("");
  const [destMACheader, setDestMACheader] = useState("");

  // IP Header
  // Source:
  const [sourceIP, setSourceIP] = useState("");
  const [sourceMAC, setSourceMAC] = useState("");

  // Destination:
  const [destIP, setDestIP] = useState("");
  const [destMAC, setDestMAC] = useState("");

  // data
  const [content, setContent] = useState("");

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
      port: "1/2",
    },
    {
      id: 1,
      component: "PC 2",
      ip: "150.50.1.3 /24",
      mac: "D4:E1:8C:9E:3F:5A",
      port: "1/3",
    },
    {
      id: 2,
      component: "PC 3",
      ip: "170.70.1.2 /24",
      mac: "00:50:56:A3:EF:82",
      port: "2/2",
    },
    {
      id: 3,
      component: "PC 4",
      ip: "170.70.1.3 /24",
      mac: "F2:16:7A:8E:2D:45",
      port: "2/3",
    },
    {
      id: 4,
      component: "Switch 1",
      ip: "-",
      mac: "-",
      port: "-",
    },
    {
      id: 5,
      component: "Switch 2",
      ip: "-",
      mac: "-",
      port: "-",
    },
    {
      id: 6,
      component: "Router 1 - A",
      ip: "150.50.1.1 /24",
      mac: "30:D0:E3:1F:A9:98",
      port: "1/1",
    },
    {
      id: 7,
      component: "Router 1 - B",
      ip: "200.20.1.1 /24",
      mac: "00:50:56:A5:2B:1C",
      port: "-",
    },
    {
      id: 8,
      component: "Router 2 - A",
      ip: "170.70.1.1 /24",
      mac: "EC:8F:AA:4A:58:17",
      port: "2/1",
    },
    {
      id: 9,
      component: "Router 2 - B",
      ip: "200.20.1.2 /24",
      mac: "3C:8E:37:2E:F3:9B",
      port: "-",
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

  // Server Anfrage des Teams
  useEffect(() => {
    socket.emit("getTeam", room, (response) => {
      if (response.success) {
        setTeam(response.message);
      }
    });
  });

  // Port-Header

  // Team 1
  const PortOptions1 = ["1/1", "1/2", "1/3"];

  // Team 2
  const PortOptions2 = ["2/1", "2/2", "2/3"];

  // Port-Header Optionen nach Team bestimmen
  useEffect(() => {
    if (team === "Team 1") {
      setPortOptions(PortOptions1);
    } else {
      setPortOptions(PortOptions2);
    }
  }, [team]);

  // MAC-Header

  // Team 1
  const MACheaderOptions1 = [
    "78:23:4B:B0:A1:C7",
    "D4:E1:8C:9E:3F:5A",
    "30:D0:E3:1F:A9:98",
  ];

  // Team 2
  const MACheaderOptions2 = [
    "00:50:56:A3:EF:82",
    "F2:16:7A:8E:2D:45",
    "EC:8F:AA:4A:58:17",
  ];

  // MAC-Header Optionen nach Team bestimmen
  useEffect(() => {
    if (team === "Team 1") {
      setMACheaderOptions(MACheaderOptions1);
    } else {
      setMACheaderOptions(MACheaderOptions2);
    }
  }, [team]);

  // IP Header

  // Source Ip Optionen
  const SourceIPOptions = [
    "150.50.1.1 /24",
    "150.50.1.2 /24",
    "170.70.1.1 /24",
    "170.70.1.2 /24",
  ];

  // Source Mac Optionen
  const SourceMACOptions = [
    "78:23:4B:B0:A1:C7",
    "D4:E1:8C:9E:3F:5A",
    "00:50:56:A3:EF:82",
    "F2:16:7A:8E:2D:45",
  ];

  // Dest Ip Optionen
  const DestIPOptions = [
    "150.50.1.1 /24",
    "150.50.1.2 /24",
    "170.70.1.1 /24",
    "170.70.1.2 /24",
  ];

  // Dest Mac Optionen
  const DestMACOptions = [
    "78:23:4B:B0:A1:C7",
    "D4:E1:8C:9E:3F:5A",
    "00:50:56:A3:EF:82",
    "F2:16:7A:8E:2D:45",
  ];

  // IP-Header vom PC bekommen
  const getTask = () => {
    socket.emit("SwitchTask", room, (response) => {
      if (response.success) {
        if (typeof response.message === "object") {
          setHeaderData(response.message);
        } else {
          console.log("Response message is not an object");
        }
      }
    });
  };

  const submitPacket = () => {
    const IPHeader = {
      sourceIP: sourceIP,
      sourceMAC: sourceMAC,
      destIP: destIP,
      destMAC: destMAC,
      encryptedContent: content,
    };

    const MACHeader = {
      sourceMAC: sourceMACheader,
      destMAC: destMACheader,
      IPHeader: IPHeader,
    };

    socket.emit("SwitchToComponents", room, port, MACHeader);
  };

  return (
    <div>
      <div>
        <div className="comp-Switch-pic-frame">
          <img
            src="..\src\components\grafiken\Switch_3D.png"
            className="comp-Switch-pic"
          ></img>
        </div>
        <a className="game-Switch-Username">{Username}</a>
        <a className="game-Switch-Component">{Component}</a>
        <a className="game-Switch-Team">{team}</a>
        <hr></hr>
      </div>

      <div className="game-Switch-UserInterface">
        {/* Aufgaben Feld */}

        <div className="game-Switch-Aufgabe">
          <a>Ankommende Daten:</a>
          {headerData && headerData.IPHeader && (
            <Fragment key={headerData.id}>
              <div className="game-Switch-Aufgabe-MACHeader">
                <h3>MAC-Header:</h3>
                <p>Source-MAC: {headerData.sourceMAC}</p>
                <p>Dest-MAC: {headerData.destMAC}</p>
                <div className="game-Switch-Aufgabe-IPHeader">
                  <h3>IP-Header:</h3>
                  <p>Source-IP: {headerData.IPHeader.sourceIP}</p>
                  <p>Source-MAC: {headerData.IPHeader.sourceMAC}</p>
                  <p>Dest-IP: {headerData.IPHeader.destIP}</p>
                  <p>Dest-MAC: {headerData.IPHeader.destMAC}</p>
                  <p>Data: {headerData.IPHeader.content}</p>
                </div>
              </div>
            </Fragment>
          )}
          <button onClick={getTask}>Task Anfragen</button>
        </div>

        {/* IP Header */}

        <div className="game-Switch-Formular">
          <a>Port-Header</a>
          <div>
            <form>
              <label htmlFor="port">Port:</label>
              <br />
              <select
                className="game-Switch-dropdown"
                name="port"
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              >
                <option value="">Bitte Auswählen</option>
                {portOptions.map((port, index) => (
                  <option key={index} value={port}>
                    {port}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="game-Switch-Formular-MACHeader-Container">
            <a>MAC-Header</a>
            <div className="game-Switch-Formular-MACHeader">
              <form>
                <p>Source:</p>
                <label htmlFor="sourceMACheader">MAC-Adresse:</label>
                <br />
                <select
                  className="game-Switch-dropdown"
                  name="sourceMACheader"
                  id="sourceMACheader"
                  value={sourceMACheader}
                  onChange={(e) => setSourceMACheader(e.target.value)}
                >
                  <option value="">Bitte Auswählen</option>
                  {MACheaderOptions.map((mac, index) => (
                    <option key={index} value={mac}>
                      {mac}
                    </option>
                  ))}
                </select>
              </form>
              <form>
                <p>Dest:</p>
                <label htmlFor="destMACheader">MAC-Adresse:</label>
                <br />
                <select
                  className="game-Switch-dropdown"
                  name="destMACheader"
                  id="destMACheader"
                  value={destMACheader}
                  onChange={(e) => setDestMACheader(e.target.value)}
                >
                  <option value="">Bitte Auswählen</option>
                  {MACheaderOptions.map((mac, index) => (
                    <option key={index} value={mac}>
                      {mac}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div className="game-Switch-Formular-IPHeader">
              <a>IP-Header:</a>
              <br></br>
              <div className="game-Switch-Formular-Inputs">
                <div className="game-Switch-Formular-container">
                  <form className="game-Switch-Formular-source">
                    <p>Source:</p>
                    <label htmlFor="sourceIP">IP-Adresse:</label>
                    <br />
                    <select
                      className="game-Switch-dropdown"
                      name="sourceIP"
                      id="sourceIP"
                      value={sourceIP}
                      onChange={(e) => setSourceIP(e.target.value)}
                    >
                      <option value="">Bitte Auswählen</option>
                      {SourceIPOptions.map((ip, index) => (
                        <option key={index} value={ip}>
                          {ip}
                        </option>
                      ))}
                    </select>
                    <br />
                    <label htmlFor="sourceMAC">MAC-Adresse:</label>
                    <br />
                    <select
                      className="game-Switch-dropdown"
                      name="sourceMAC"
                      id="sourceMAC"
                      value={sourceMAC}
                      onChange={(e) => setSourceMAC(e.target.value)}
                    >
                      <option value="">Bitte Auswählen</option>
                      {SourceMACOptions.map((mac, index) => (
                        <option key={index} value={mac}>
                          {mac}
                        </option>
                      ))}
                    </select>
                    <br />
                  </form>
                  <form className="game-Switch-Formular-dest">
                    <p>Destination:</p>
                    <label htmlFor="destIP">IP-Adresse:</label>
                    <br />
                    <select
                      className="game-Switch-dropdown"
                      name="destIP"
                      id="destIP"
                      value={destIP}
                      onChange={(e) => setDestIP(e.target.value)}
                    >
                      <option value="">Bitte Auswählen</option>
                      {DestIPOptions.map((ip, index) => (
                        <option key={index} value={ip}>
                          {ip}
                        </option>
                      ))}
                    </select>
                    <br />
                    <label htmlFor="destMAC">MAC-Adresse:</label>
                    <br />
                    <select
                      className="game-Switch-dropdown"
                      name="destMAC"
                      id="destMAC"
                      value={destMAC}
                      onChange={(e) => setDestMAC(e.target.value)}
                    >
                      <option value="">Bitte Auswählen</option>
                      {DestMACOptions.map((mac, index) => (
                        <option key={index} value={mac}>
                          {mac}
                        </option>
                      ))}
                    </select>
                    <br />
                  </form>
                </div>
                <form>
                  <label htmlFor="content">Verschlüsselter Inhalt:</label>
                  <br />
                  <input
                    type="text"
                    name="content"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <br />
                </form>
              </div>
            </div>
          </div>
          <button
            className="game-Switch-confirm-formular"
            onClick={submitPacket}
          >
            Done
          </button>
        </div>

        {/* Address Tabelle */}

        <div className="game-Switch-Table-Container">
          <a>Address-Tabelle:</a>
          <br></br>
          <table className="game-Switch-Table">
            <thead className="game-Switch-Table-Head">
              <tr>
                <th>Komponente</th>
                <th>IP-Adresse</th>
                <th>MAC-Adresse</th>
                <th>Switch-Port</th>
              </tr>
            </thead>
            <tbody className="game-Switch-Table-Body">
              {Addresses.map((component) => (
                <Fragment key={component.id}>
                  <tr>
                    <td>{component.component}</td>
                    <td>{component.ip}</td>
                    <td>{component.mac}</td>
                    <td>{component.port}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br></br>

      {/* Game Info Panel */}

      <div className="game-Switch-info-container">
        {/* Map / Real Overview */}

        <div className="game-Switch-Realtime-Overview">
          <a>Realtime Overview:</a>
          <br></br>
          <div className="game-Switch-Team-Progress-1-description">
            <a>Team 1</a>
          </div>
          <br></br>
          <div className="game-Switch-Team-Progress-1-container">
            <progress
              className="game-Switch-Team-Progress-1"
              value={team1Points}
              max={maxPoints}
            ></progress>
            <span className="game-Switch-Team-Progress-1-State">
              {<a>{team1Points}</a>} /{<a>{maxPoints}</a>} Punkte
            </span>
          </div>
          <br></br>
          <div className="game-Switch-Team-Progress-2-description">
            <a>Team 2</a>
          </div>
          <br></br>
          <div className="game-Switch-Team-Progress-2-container">
            <progress
              className="game-Switch-Team-Progress-2"
              value={15}
              max={maxPoints}
            ></progress>
            <span className="game-Switch-Team-Progress-2-State">
              {<a>{team2Points}</a>} /{<a>{maxPoints}</a>} Punkte
            </span>
          </div>
          <br></br>
          <hr></hr>
          <div className="game-Switch-Scenes-RO">
            <div className="game-Switch-Scene-Team-1">
              <div className="game-Switch-Scene-PC1">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 1</a>
              </div>
              <div className="game-Switch-Scene-PC2">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 2</a>
              </div>
              <div className="game-Switch-Scene-Switch1">
                <img src="..\src\components\grafiken\Switch_3D.png"></img>
                <a>Switch 1</a>
              </div>
              <div className="game-Switch-Scene-Router1">
                <img src="..\src\components\grafiken\Router_3D.png"></img>
                <a>Router 1</a>
              </div>
              <div className="game-Switch-Scene-Line-PC1-Switch1"></div>
              <div className="game-Switch-Scene-Line-PC2-Switch1"></div>
              <div className="game-Switch-Scene-Line-Switch1-Router1"></div>
            </div>
            <div>
              <div className="game-Switch-Scene-Line-Router1-Router2"></div>
            </div>
            <div className="game-Switch-Scene-Team-2">
              <div className="game-Switch-Scene-PC3">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 3</a>
              </div>
              <div className="game-Switch-Scene-PC4">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 4</a>
              </div>
              <div className="game-Switch-Scene-Switch2">
                <img src="..\src\components\grafiken\Switch_3D.png"></img>
                <a>Switch 2</a>
              </div>
              <div className="game-Switch-Scene-Router2">
                <img src="..\src\components\grafiken\Router_3D.png"></img>
                <a>Router 2</a>
              </div>
              <div className="game-Switch-Scene-Line-PC3-Switch2"></div>
              <div className="game-Switch-Scene-Line-PC4-Switch2"></div>
              <div className="game-Switch-Scene-Line-Switch2-Router2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Switch;

import "./PC.css";
import React, { useEffect, useState, Fragment } from "react";
import socket from "../../socket";

const PC = ({ room }) => {
  // Username
  const [Username, setUsername] = useState("");

  // Component
  const [Component, setComponent] = useState("");

  // Team
  const [team, setTeam] = useState("");

  // Task für PC
  const [sendWord, setSendWord] = useState("");
  const [taskError, setTaskError] = useState("");

  // Source:
  const [sourceIP, setSourceIP] = useState("");
  const [sourceMAC, setSourceMAC] = useState("");

  // Destination:
  const [destIP, setDestIP] = useState("");
  const [destMAC, setDestMAC] = useState("");

  // MAC-header
  const [MACheadOptions, setMACheadOptions] = useState([]);
  const [sourceMACheader, setSourceMACheader] = useState("");
  const [destMACheader, setDestMACheader] = useState("");

  // IP-header Data:
  const [encryptedContent, setEncryptedContent] = useState("");

  // Data Packet vom Switch
  const [dataPacket, setDataPacket] = useState("");

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

  // Liste der Großbuchstaben in ASCII Code
  const GreaterAscii = [
    { id: 0, letter: "A", code: "0100 0001" },
    { id: 1, letter: "B", code: "0100 0010" },
    { id: 2, letter: "C", code: "0100 0011" },
    { id: 3, letter: "D", code: "0100 0100" },
    { id: 4, letter: "E", code: "0100 0101" },
    { id: 5, letter: "F", code: "0100 0110" },
    { id: 6, letter: "G", code: "0100 0111" },
    { id: 7, letter: "H", code: "0100 1000" },
    { id: 8, letter: "I", code: "0100 1001" },
    { id: 9, letter: "J", code: "0100 1010" },
    { id: 10, letter: "K", code: "0100 1011" },
    { id: 11, letter: "L", code: "0100 1100" },
    { id: 12, letter: "M", code: "0100 1101" },
    { id: 13, letter: "N", code: "0100 1110" },
    { id: 14, letter: "O", code: "0100 1111" },
    { id: 15, letter: "P", code: "0101 0000" },
    { id: 16, letter: "Q", code: "0101 0001" },
    { id: 17, letter: "R", code: "0101 0010" },
    { id: 18, letter: "S", code: "0101 0011" },
    { id: 19, letter: "T", code: "0101 0100" },
    { id: 20, letter: "U", code: "0101 0101" },
    { id: 21, letter: "V", code: "0101 0110" },
    { id: 22, letter: "W", code: "0101 0111" },
    { id: 23, letter: "X", code: "0101 1000" },
    { id: 24, letter: "Y", code: "0101 1001" },
    { id: 25, letter: "Z", code: "0101 1010" },
  ];

  // Liste der Kleinbuchstaben in ASCII Code
  const LowerAscii = [
    { id: 0, letter: "a", code: "0110 0001" },
    { id: 1, letter: "b", code: "0110 0010" },
    { id: 2, letter: "c", code: "0110 0011" },
    { id: 3, letter: "d", code: "0110 0100" },
    { id: 4, letter: "e", code: "0110 0101" },
    { id: 5, letter: "f", code: "0110 0110" },
    { id: 6, letter: "g", code: "0110 0111" },
    { id: 7, letter: "h", code: "0110 1000" },
    { id: 8, letter: "i", code: "0110 1001" },
    { id: 9, letter: "j", code: "0110 1010" },
    { id: 10, letter: "k", code: "0110 1011" },
    { id: 11, letter: "l", code: "0110 1100" },
    { id: 12, letter: "m", code: "0110 1101" },
    { id: 13, letter: "n", code: "0110 1110" },
    { id: 14, letter: "o", code: "0110 1111" },
    { id: 15, letter: "p", code: "0111 0000" },
    { id: 16, letter: "q", code: "0111 0001" },
    { id: 17, letter: "r", code: "0111 0010" },
    { id: 18, letter: "s", code: "0111 0011" },
    { id: 19, letter: "t", code: "0111 0100" },
    { id: 20, letter: "u", code: "0111 0101" },
    { id: 21, letter: "v", code: "0111 0110" },
    { id: 22, letter: "w", code: "0111 0111" },
    { id: 23, letter: "x", code: "0111 1000" },
    { id: 24, letter: "y", code: "0111 1001" },
    { id: 25, letter: "z", code: "0111 1010" },
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

  // MAC Header

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
      setMACheadOptions(MACheaderOptions1);
    } else {
      setMACheadOptions(MACheaderOptions2);
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

  // Sende Formular ins Backend um zum Switch weitergeleitet zu werden
  const handleSubmit = () => {
    const IPHeader = {
      sourceIP: sourceIP,
      sourceMAC: sourceMAC,
      destIP: destIP,
      destMAC: destMAC,
      encryptedContent: encryptedContent,
    };

    const MACHeader = {
      sourceMAC: sourceMACheader,
      destMAC: destMACheader,
      IPHeader: IPHeader,
    };

    //console.log(MACHeader); // Debugging Ausgabe

    socket.emit("PCtoSwitch", room, MACHeader);

    // console.log(IPHeader) // Debugging Ausgabe
  };

  // Task für den PC vom Backend
  const handleGetTask = () => {
    socket.emit("PCTask", room, (response) => {
      if (response.success) {
        setSendWord(response.message);
      } else {
        setTaskError(response.message);
      }
    });
  };

  // Task vom Backend Annehmen
  const handleAcceptTask = () => {
    socket.emit("PCTaskAccept", room, sendWord);
  };

  const getDataPacket = () => {
    socket.emit("GetDataPacket", room, (response) => {
      if (response) {
        setDataPacket(response.message);
      }
    });
  };

  return (
    <div>
      <div>
        <div className="comp-PC-pic-frame">
          <img
            src="..\src\components\grafiken\PC_3D.png"
            className="comp-PC-pic"
          ></img>
        </div>
        <a className="game-PC-Username">{Username}</a>
        <a className="game-PC-Component">{Component}</a>
        <a className="game-PC-Team">{team}</a>
        <hr></hr>
      </div>

      <div className="game-PC-UserInterface">
        {/* Aufgaben Feld */}

        <div className="game-PC-Aufgabe-Container">
          <div className="game-PC-Aufgabe">
            <div>
              <a>Sende folgendes Wort: {sendWord}</a>
              {taskError && <p>{taskError}</p>}
              <br />
              <button onClick={handleGetTask}>Aufgabe Anfragen</button>
              <button onClick={handleAcceptTask}>Aufgabe Annehmen</button>
            </div>
            <hr className="game-PC-Aufgabe-Hr" />
            <div>
              {Component != "PC 1" && (
                <div>
                  <p>PC 1:</p>
                  <div className="game-PC-Aufgabe-Task-Submit-container">
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="1Word">1. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="2Word">2. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="3Word">3. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="4Word">4. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                  </div>
                </div>
              )}

              {Component != "PC 2" && (
                <div>
                  <a>PC 2:</a>
                  <div className="game-PC-Aufgabe-Task-Submit-container">
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="1Word">1. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="2Word">2. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="3Word">3. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="4Word">4. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                  </div>
                </div>
              )}

              {Component != "PC 3" && (
                <div>
                  <a>PC 3:</a>
                  <div className="game-PC-Aufgabe-Task-Submit-container">
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="1Word">1. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="2Word">2. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="3Word">3. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="4Word">4. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                  </div>
                </div>
              )}

              {Component != "PC 4" && (
                <div>
                  <a>PC 4:</a>
                  <div className="game-PC-Aufgabe-Task-Submit-container">
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="1Word">1. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="2Word">2. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="3Word">3. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                    <form className="game-PC-Aufgabe-Task-Submit-Form">
                      <label htmlFor="4Word">4. Wort</label>
                      <br />
                      <input
                        className="game-PC-Aufgabe-Task-Submit"
                        placeholder="A-Z, a-z"
                      ></input>
                      <button className="game-PC-Aufgabe-Task-Submit-Button"></button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <hr></hr>
          </div>
          <div className="game-PC-Aufgabe-Data">
            <div>
              <a>Datenpaket verfolgung:</a>
            </div>
            <hr className="game-PC-Aufgabe-Hr" />
            <div>
              <a>Angekommendes Datenpaket:</a>
              {dataPacket && dataPacket.IPHeader && (
                <Fragment key={dataPacket.id}>
                  <div className="game-PC-Aufgabe-MACHeader">
                    <h3>MAC-Header:</h3>
                    <div className="game-PC-Aufgabe-MACHeader-Data-Display">
                      <div>
                        <p>Source-Mac: {dataPacket.sourceMAC}</p>
                      </div>
                      <hr className="game-PC-IPHeder-Data-hr" />
                      <div>
                        <p>Dest-MAC: {dataPacket.destMAC}</p>
                      </div>
                    </div>
                    <div className="game-PC-Aufgabe-IPHeader">
                      <h3>IP-Header:</h3>
                      <div className="game-PC-Aufgabe-IPHeader-Data-Display">
                        <div>
                          <p>Source-IP: {dataPacket.IPHeader.sourceIP}</p>
                          <p>Source-MAC: {dataPacket.IPHeader.sourceMAC}</p>
                        </div>
                        <hr className="game-PC-IPHeder-Data-hr" />
                        <div>
                          <p>Dest-IP: {dataPacket.IPHeader.destIP}</p>
                          <p>Dest-MAC: {dataPacket.IPHeader.destMAC}</p>
                        </div>
                      </div>
                      <p>Data: {dataPacket.IPHeader.content}</p>
                    </div>
                  </div>
                </Fragment>
              )}
              <button onClick={getDataPacket}>Daten Anfragen</button>
            </div>
          </div>
        </div>

        {/* Datenpaket Erstellung */}

        <div className="game-PC-Formular">
          <a>MAC-Header</a>
          <div className="game-PC-Formular-MACHeader">
            <form>
              <p>Source:</p>
              <label htmlFor="sourceMACheader">MAC-Adresse:</label>
              <br />
              <select
                className="game-PC-dropdown"
                name="sourceMACheader"
                id="sourceMACheader"
                value={sourceMACheader}
                onChange={(e) => setSourceMACheader(e.target.value)}
              >
                <option value="">Bitte Auswählen</option>
                {MACheadOptions.map((mac, index) => (
                  <option key={index} value={mac}>
                    {mac}
                  </option>
                ))}
              </select>
            </form>
            <form>
              <p>Dest:</p>
              <label>MAC-Adresse:</label>
              <br />
              <select
                className="game-PC-dropdown"
                name="destMACheader"
                id="destMACheader"
                value={destMACheader}
                onChange={(e) => setDestMACheader(e.target.value)}
              >
                <option value="">Bitte Auswählen</option>
                {MACheadOptions.map((mac, index) => (
                  <option key={index} value={mac}>
                    {mac}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="game-PC-Formular-IPHeader">
            <a>IP-Header:</a>
            <br></br>
            <div className="game-PC-Formular-Inputs">
              <div className="game-PC-Formular-container">
                <form className="game-PC-Formular-source">
                  <p>Source:</p>
                  <label htmlFor="sourceIP">IP-Adresse:</label>
                  <br />
                  <select
                    className="game-PC-dropdown"
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
                    className="game-PC-dropdown"
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
                <form className="game-PC-Formular-dest">
                  <p>Destination:</p>
                  <label htmlFor="destIP">IP-Adresse:</label>
                  <br />
                  <select
                    className="game-PC-dropdown"
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
                    className="game-PC-dropdown"
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
                <label htmlFor="encryptedContent">
                  Verschlüsselter Inhalt:
                </label>
                <br />
                <input
                  type="text"
                  name="encryptedContent"
                  id="encryptedContent"
                  value={encryptedContent}
                  onChange={(e) => setEncryptedContent(e.target.value)}
                />
                <br />
              </form>
            </div>
          </div>
          <button className="game-PC-confirm-formular" onClick={handleSubmit}>
            Done
          </button>
        </div>

        {/* Address Tabelle */}

        <div className="game-PC-Table-Container">
          <a>Address-Tabelle:</a>
          <br></br>
          <table className="game-PC-Table">
            <thead className="game-PC-Table-Head">
              <tr>
                <th>Komponente</th>
                <th>IP-Adresse</th>
                <th>MAC-Adresse</th>
              </tr>
            </thead>
            <tbody className="game-PC-Table-Body">
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

      <div className="game-PC-info-container">
        {/* Map / Real Overview */}

        <div className="game-PC-Realtime-Overview">
          <a>Realtime Overview:</a>
          <br></br>
          <div className="game-PC-Team-Progress-1-description">
            <a>Team 1</a>
          </div>
          <br></br>
          <div className="game-PC-Team-Progress-1-container">
            <progress
              className="game-PC-Team-Progress-1"
              value={team1Points}
              max={maxPoints}
            ></progress>
            <span className="game-PC-Team-Progress-1-State">
              {<a>{team1Points}</a>} /{<a>{maxPoints}</a>} Punkte
            </span>
          </div>
          <br></br>
          <div className="game-PC-Team-Progress-2-description">
            <a>Team 2</a>
          </div>
          <br></br>
          <div className="game-PC-Team-Progress-2-container">
            <progress
              className="game-PC-Team-Progress-2"
              value={15}
              max={maxPoints}
            ></progress>
            <span className="game-PC-Team-Progress-2-State">
              {<a>{team2Points}</a>} /{<a>{maxPoints}</a>} Punkte
            </span>
          </div>
          <br></br>
          <hr></hr>
          <div className="game-PC-Scenes-RO">
            <div className="game-PC-Scene-Team-1">
              <div className="game-PC-Scene-PC1">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 1</a>
              </div>
              <div className="game-PC-Scene-PC2">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 2</a>
              </div>
              <div className="game-PC-Scene-Switch1">
                <img src="..\src\components\grafiken\Switch_3D.png"></img>
                <a>Switch 1</a>
              </div>
              <div className="game-PC-Scene-Router1">
                <img src="..\src\components\grafiken\Router_3D.png"></img>
                <a>Router 1</a>
              </div>
              <div className="game-PC-Scene-Line-PC1-Switch1"></div>
              <div className="game-PC-Scene-Line-PC2-Switch1"></div>
              <div className="game-PC-Scene-Line-Switch1-Router1"></div>
            </div>
            <div>
              <div className="game-PC-Scene-Line-Router1-Router2"></div>
            </div>
            <div className="game-PC-Scene-Team-2">
              <div className="game-PC-Scene-PC3">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 3</a>
              </div>
              <div className="game-PC-Scene-PC4">
                <img src="..\src\components\grafiken\PC_3D.png"></img>
                <a>PC 4</a>
              </div>
              <div className="game-PC-Scene-Switch2">
                <img src="..\src\components\grafiken\Switch_3D.png"></img>
                <a>Switch 2</a>
              </div>
              <div className="game-PC-Scene-Router2">
                <img src="..\src\components\grafiken\Router_3D.png"></img>
                <a>Router 2</a>
              </div>
              <div className="game-PC-Scene-Line-PC3-Switch2"></div>
              <div className="game-PC-Scene-Line-PC4-Switch2"></div>
              <div className="game-PC-Scene-Line-Switch2-Router2"></div>
            </div>
          </div>
        </div>

        {/* ASCII Table */}

        <div className="game-PC-Table-Ascii-container">
          <a>ASCII Tabelle:</a>
          <br></br>
          <div className="game-PC-Table-Ascii-Table">
            <table className="game-PC-Table">
              <thead className="game-PC-Table-Head">
                <tr>
                  <th>Symbol</th>
                  <th>BIN</th>
                </tr>
              </thead>
              <tbody className="game-PC-Table-Body">
                {GreaterAscii.map((letter) => (
                  <Fragment key={letter.id}>
                    <tr>
                      <td>{letter.letter}</td>
                      <td>{letter.code}</td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>

            <table className="game-PC-Table">
              <thead className="game-PC-Table-Head">
                <tr>
                  <th>Symbol</th>
                  <th>BIN</th>
                </tr>
              </thead>
              <tbody className="game-PC-Table-Body">
                {LowerAscii.map((letter) => (
                  <Fragment key={letter.id}>
                    <tr>
                      <td>{letter.letter}</td>
                      <td>{letter.code}</td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PC;

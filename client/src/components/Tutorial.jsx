import React, { useState } from 'react'
import "./Tutorial.css"

const texts = {
  english: [
    <div>

      <h1>Welcome to the tutorial.</h1>

      <p>In this tutorial we will explain the game and the basics of routing.</p>

      <p>First, select a network component that you would like to play.</p>

      <p>Once you have selected the component, you will see the following GUI. This may vary depending on the component.</p>

      <p><h1>PC</h1></p>
      <img src="src\components\grafiken\PC_3D.png"></img>
      <p>Platzhalter</p>

      <p><h1>Router</h1></p>
      <img src="src\components\grafiken\Router_3D.png"/>
      <p>Platzhalter</p>

      <p><h1>Switch</h1></p>
      <img src="src\components\grafiken\Switch_3D.png"></img>
      <p>Platzhalter</p>

      <p><h1>Data packets</h1></p>
      <img src="src\components\grafiken\Brief.png"></img>
      <p>Platzhalter</p>

    </div>
  ],

  german: [
    <div>
      
      <h1>Willkommen zum Tutorial.</h1>

      <p>In diesem Tutorial werden wir dir das Spiel und somit auch die Grundlagen von Routing erklären.</p>

      <p>Als Erstes suchst du dir eine Netzwerkkomponente aus, die du spielen möchtest.</p>

      <p>Nachdem du die Komponente ausgewählt hast siehst du das folgende GUI. Dies kann je nach Komponente variieren. </p>

      <p><h1>PC</h1></p>
      <img src="src\components\grafiken\PC_3D.png"></img>
      <p>Platzhalter</p>

      <p><h1>Router</h1></p>
      <img src="src\components\grafiken\Router_3D.png"/>
      <p>Platzhalter</p>

      <p><h1>Switch</h1></p>
      <img src="src\components\grafiken\Switch_3D.png"></img>
      <p>Platzhalter</p>

      <p><h1>Datenpakete</h1></p>
      <img src="src\components\grafiken\Brief.png"></img>
      <p>Platzhalter</p>

    </div>
  ]
}

function Tutorial() {
  const [language, setLanguage] = useState("english");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>  (prevLanguage === "english" ? "german" : "english"));
  }

  return (
    <div>

      {texts[language].map((text, index) => <p key = {index}>{text}</p>)}
      <button onClick={toggleLanguage}>Sprache umschalten</button>

    </div>
  )
}

export default Tutorial
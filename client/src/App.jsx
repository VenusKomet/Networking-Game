import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Tutorial from './components/Tutorial'
import Errorpage from './components/Errorpage'
import Game from './components/Game'

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/room/:roomid' element={<Game/>} />
          <Route path='*' element={<Errorpage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
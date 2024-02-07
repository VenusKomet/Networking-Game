import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Nav = ({count}) => {
  return (
    <nav>
            <ul>
                <li className='title'>Networking Game</li>
                <li>
                    <Link to="/" className='Link'>Home</Link>
                </li>
                <li>
                    <Link to="/about" className='Link'>About</Link>
                </li>
                <li>
                    <Link to="/tutorial" className='Link'>Tutorial</Link>
                </li>
            </ul>

            {count >= 20 && <Link className='Link' to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Suprise</Link>}

            <hr></hr>
    </nav>
  )
}

const Navbar = () => {

    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)
    const [name, setName] = useState("Hide")

    const ButtonHandler = () => {
        setShow(!show)

        if (show == true) {
            setName("Hide")
        }
        else {
            setName("Show")
        }

        setCount(count + 1)
    }

  return (
    <div>
        <button onClick={ButtonHandler} className='Button1'>{name}</button>
        {show == false && <Nav count={count}/>}
        
    </div>
    
  )
}

export default Navbar
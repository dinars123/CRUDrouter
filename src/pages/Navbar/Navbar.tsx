import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'



const Navbar = () => {
    return (
        <nav className='nav'>
            <ul className='ul'>
                <li className='li'>
                    <Link className='link' to="/about">About</Link>
                </li>
                <li className='li'>
                    <Link className='link' to = "/cars">Cars</Link>
                </li>
                <li className='li'>
                    <Link className='link' to = "/">Home</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
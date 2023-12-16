import React from 'react'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import Cars from './pages/Cars/Cars'
import About from './pages/About/About'
import CarId from './pages/car/car'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cars' element={<Cars />} />
            <Route path='/about' element={<About />} />
            <Route path='/cars/:id' element={<CarId />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App

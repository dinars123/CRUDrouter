import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './car.css'

const CarId = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { car } = location.state;

  return (
    <div className='wrapper'>
    <div className="car-card">
      <img
        src={`https://www.carlogos.org/car-logos/${car.make}-logo.png`}
        alt=""
      />
      <div className="splitText">
        <h2>{car.make}</h2> <h2>{car.model}</h2>
      </div>
      <div className="splitText">
        <span>Year :</span>
        <span>{car.year}</span>
      </div>
      <div className="splitText">
        <span>Fuel Type :</span> <span>{car.fuel_type}</span>
      </div>
      <div className="splitText">
        <span>Horsepower :</span> <span>{car.horsepower}</span>
      </div>
      <div className="splitText">
        <span>Color :</span> <span>{car.color}</span>{' '}
      </div>
      <button className='goBack' onClick={() => navigate(-1)}>go back</button>
    </div>
    </div>
  );
};

export default CarId;

import axios, { AxiosResponse } from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import './Cars.css';

const retrievePosts = async () => {
  const response = await axios.get('http://localhost:3001/cars');
  return response.data;
};



interface Car {
  make: string;
  model: string;
  year: string;
  fuel_type: string;
  horsepower: string;
  color: string;
  symbol: string;
  id: number;
}


function Cars() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: fetchedCarData, isLoading, error } = useQuery({
  queryFn: retrievePosts,
  queryKey: ['carKey'],
  });
  console.log('fetched data',fetchedCarData)
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    fuel_type: '',
    horsepower: '',
    color: '',
  });

  const { mutateAsync } = useMutation<AxiosResponse, Car, unknown>({
    mutationFn: (newCar) => axios.post('http://localhost:3001/cars', newCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carKey'] });
      setFormData({
        make: '',
        model: '',
        year: '',
        fuel_type: '',
        horsepower: '',
        color: '',
      });
    },
    onError: (error) => {
      console.error('Error adding new car:', error);
    },
  });


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync(formData);
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  const handleDelete = useMutation({
    mutationFn: (carId: number) => {
      return axios.delete(`http://localhost:3001/cars/${carId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carKey'] });
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Error fetching car data:', error);
    return <div>Error fetching car data. Please try again.</div>;
  }
  const { cars } = fetchedCarData;
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="newCarForm">
        <input
          className="input"
          type="text"
          name="make"
          value={formData.make}
          onChange={handleInputChange}
          placeholder="make"
        />
        <input
          className="input"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          placeholder="model"
        />
        <input
          className="input"
          type="text"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          placeholder="year"
        />
        <input
          className="input"
          type="text"
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleInputChange}
          placeholder="fuel_type"
        />
        <input
          className="input"
          type="text"
          name="horsepower"
          value={formData.horsepower}
          onChange={handleInputChange}
          placeholder="horsepower"
        />
        <input
          className="input"
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          placeholder="color"
        />
        <button type="submit">Add</button>
      </form>
      <div className="carWrapper">
        {cars.map((car: Car) => (
          <div key={car.id} className="car-card">
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
            <hr className="hr" />
            <div className="splitText">
            <button onClick={() => handleDelete.mutate(car.id)}>Delete</button>
            <button onClick={() => navigate(`/cars/${car.id}`, { state: { car } })}>Learn More</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;

import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero d-flex justify-content-center align-items-center" style={{ height: '100vh', position: 'relative', overflow: 'hidden'}}>
      <img
        className="card-img"
        src="./assets/home.jpg"
        alt="Background"
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1)' }}
      />
      <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
        <div className="banner-text text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '10px' }}>
          <h1 className="mb-4" style={{ color: '#053f4c' }}>GearUp Store</h1>
          <p className="lead mb-4" style={{ color: '#333333' }}>We sell Sports Equipments and Accessories</p>
          <Link to="/Product" className="btn btn-lg" style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;


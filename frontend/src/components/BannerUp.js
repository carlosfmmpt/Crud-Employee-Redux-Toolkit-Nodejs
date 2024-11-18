// src/components/Banner.js
import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-semibold">Employee Management System</h1>
      {/* Botón que redirige a HomePage */}
      <Link to="/">
        <button className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100">
          Home
        </button>
      </Link>
    </div>
  );
};

export default Banner;

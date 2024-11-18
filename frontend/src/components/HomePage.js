// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Employee Management System</h1>
      <div className="text-center">
        {/* Link que redirige al componente EmployeeRegistration */}
        <Link to="/employee-registration">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Go to Employee Registration
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

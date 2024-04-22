// src/pages/index.js
import React from 'react';
import Login from '../components/auth/Login';
import Swagger from '../pages/api/swagger'

const HomePage = () => {
  return (
    <div>
      <Login />
      <Swagger />
    </div>
  );
};

export default HomePage;

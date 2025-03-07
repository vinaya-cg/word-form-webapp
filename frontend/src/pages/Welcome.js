import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to AKS Landing Zone</h1>
      <button onClick={() => navigate('/word-form')}>AKS-Landingzone</button>
    </div>
  );
};

export default Welcome;

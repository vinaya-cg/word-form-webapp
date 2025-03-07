import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import WordForm from './pages/WordForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/word-form" element={<WordForm />} />
      </Routes>
    </Router>
  );
};

export default App;

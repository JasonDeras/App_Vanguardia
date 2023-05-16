import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register/>} /> 
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;

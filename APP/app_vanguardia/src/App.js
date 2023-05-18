import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register/>} /> 
          <Route exact path="/profile" element={<Profile/>} /> 
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;

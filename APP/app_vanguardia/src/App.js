import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import PasswordRecovery from './Components/RecoverPasword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const isloggedin=window.localStorage.getItem("logged-in")
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={ isloggedin=="true" ?<Profile/>: <Login/>} />
          <Route  path="/sign-in" element={<Login />} />
          <Route  path="/recoverpassword" element={<PasswordRecovery />} />
          <Route  path="/register" element={<Register/>} /> 
          <Route  path="/profile" element={<Profile/>} /> 
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;

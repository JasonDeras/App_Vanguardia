import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import PasswordRecovery from './Components/RecoverPasword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Chatbot from './Components/Chatbot';
import UpdateInfo from './Components/UpdateInfo';
const App = () => {
  const isloggedin=window.localStorage.getItem("logged-in")
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={ isloggedin=="true" ?<Profile/>: <Login/>} />
          <Route  path="/sign-in" element={<Login />} />
          <Route  path="/recoverpassword" element={<PasswordRecovery />} />
          <Route  path="/chatbot" element={<Chatbot/>} /> 
          <Route  path="/menu" element={<Menu/>} /> 
          <Route  path="/profile" element={<Profile/>} /> 
          <Route  path="/update" element={<UpdateInfo/>} />
          <Route  path="/register" element={<Register/>} />
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;

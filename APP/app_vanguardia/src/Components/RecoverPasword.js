import React, { useState } from 'react';
import '../Styles/RecoverPassword.css'
import { Link } from 'react-router-dom'
const PasswordRecovery = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault()
    fetch("http://localhost:5000/forgot",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Acces-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        username:username,
        
      })
    }).then((res)=>res.json()).then((data)=>{console.log(data,"userRecovery")
    alert(data.status)
      
    })
  };

  return (
    <div className="password-recovery-container">
      <h2>Password Recovery</h2>
      <form className="password-recovery-form" onSubmit={handleSubmit}>
      <label>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Recover Password</button>
        <Link to="/sign-in">Return to login</Link>
      </form>
    </div>
  );
};

export default PasswordRecovery;

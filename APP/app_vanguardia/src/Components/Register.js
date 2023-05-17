import '../Styles/Register.css';
import { Link } from 'react-router-dom'
import React, {useState, useContext} from 'react';

const Register = () => {
  
  const [entradasRegister,setentradasRegister] = useState({ID: '',nombre_completo: '', username:'', password:''});
  const onChange = (e) => setentradasRegister({...entradasRegister, [e.target.name]: e.target.value});
  const {ID,nombre_completo, username, password} = entradasRegister;

  const register = e => {
    e.preventDefault()
    fetch("http://localhost:5000/register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Acces-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        ID:entradasRegister.ID,
        name:entradasRegister.nombre_completo,
        username:entradasRegister.username,
        password:entradasRegister.password,
      })
    }).then((res)=>res.json()).then((data)=>{console.log(data,"userRegister")})
  }

  return (
    <div className="container">
      <form onSubmit={register}>
        <h2>Sign Up</h2>
        <label>ID:</label>
        <input type = "text" id="userID" name="ID" value={ID} onChange={e => onChange(e)}/>
      
		    <label>Full Name:</label>
		    <input type = "text" id="userfullname" name="nombre_completo" value={nombre_completo} onChange={e => onChange(e)}/>

		    <label >User:</label>
		    <input type = "text" id="username" name="username" value={username} onChange={e => onChange(e)}/>

	  	  <label for="password">Password:</label>
		    <input type="password" id="password" name="password" value={password} onChange={e => onChange(e)}/>

		    <input type="submit" value="Sign Up"/>
		    <p>Or sign up with:</p>
		    <a href="#">Gmail</a> |
		    <a href="#">Facebook</a>
        <p>
            <Link to='/'style={{color:'#E69C31'}}> Return to login page</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

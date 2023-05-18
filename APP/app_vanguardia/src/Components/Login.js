import React, {useState, useContext} from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom'

const Login = () => {
  const [entradasLogin,setentradasLogin] = useState({username: '',password: ''});
  const onChange = (e) => setentradasLogin({...entradasLogin, [e.target.name]: e.target.value});
  const { username, password} = entradasLogin;

  const login = e => {
    e.preventDefault()
    fetch("http://localhost:5000/login-user",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Acces-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        username:entradasLogin.username,
        password:entradasLogin.password,
      })
    }).then((res)=>res.json()).then((data)=>{console.log(data,"userLogin")
      if (data.status==="ok") {
        alert("Seccesful Login")
        window.localStorage.setItem("token",data.data)
        window.localStorage.setItem("logged-in",true)
        window.location.href="/profile"
      }
    })
  }
  
  return (
    <div className="container">
      <form onSubmit={login}>
        <h2>Login</h2>
        <label>Username:</label>
        <input type="text" id="userUsername" name="username" value={username} onChange={e => onChange(e)}/>
        <label>Password:</label>
        <input type="password" id="userpassword" name="password" value={password} onChange={e => onChange(e)}/>
        <input type="submit" value="Login"/>
        <Link to="/recoverpassword">Recover Password</Link>
        <p>Or login with:</p>
        <a href="#">Gmail</a> |
        <a href="#">Facebook</a>
        
        <p style={{color: 'black'}}>
          Don't have an account?
           <Link to='/register'style={{color:'#E69C31'}}> Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

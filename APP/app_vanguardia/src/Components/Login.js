import React from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom'

const Login = () => {

  return (
    <div className="container">
      <form>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Login" />
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

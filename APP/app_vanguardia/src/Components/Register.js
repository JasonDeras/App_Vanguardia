import React from 'react';
import '../Styles/Register.css';
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div className="container">
      <form>
        <h2>Sign Up</h2>
        <label for="name">ID:</label>
		<input type="text" id="identidad" name="identidad"/>
		<label for="name">Full Name:</label>
		<input type="text" id="name" name="name"/>
		<label for="email">User:</label>
		<input type="text" id="user" name="user"/>
		<label for="password">Password:</label>
		<input type="password" id="password" name="password"/>
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

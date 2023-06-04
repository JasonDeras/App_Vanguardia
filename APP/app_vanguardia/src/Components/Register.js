import '../Styles/Register.css';
import { Link } from 'react-router-dom'
import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2'
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
    }).then((res)=>res.json()).then((data)=>{console.log(data,"userRegister")
      if (data.status==="ID already exists") {
        Swal.fire({
          title: 'ID already exists',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }else if(data.status==="Username already exists"){
        Swal.fire({
          title: 'Username already exists',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })

      }else if(data.status==="A user with that name already exists"){
        Swal.fire({
          title: 'A user with that name already exists',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }else if(data.status==="Sucess"){
        window.location.href="/sign-in"
      }
    })
  }

  return (
    <div className="container">
      <form onSubmit={register}>
        <h2>Sign Up</h2>
        <label>ID:</label>
        <input type = "text" id="userID" name="ID" value={ID} onChange={e => onChange(e)}/>
      
		    <label>Full Name:</label>
		    <input type = "text" id="userfullname" name="nombre_completo" value={nombre_completo} onChange={e => onChange(e)}/>

		    <label >Username:</label>
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

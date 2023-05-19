import React, {useState, useEffect } from 'react';
import '../Styles/Profile.css';
const Profile = () => {
  const [userData, setUserData]= useState("")
  
  //Info gathered
  useEffect(() => { 
    fetch("http://localhost:5000/user-data",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Acces-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token:window.localStorage.getItem("token")
      })
    }).then((res)=>res.json()).then((data)=>{console.log(data,"userData"); setUserData(data.data)})
  }, []);

  //Log out
  const logout=()=>{
    window.localStorage.clear()
    window.location.href="/sign-in"
  }

  //Delete Account
  const termindate=(id)=>{
    if(window.confirm("Are you sure you want to delete your account?")){
      fetch("http://localhost:5000/delete-user",{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Acces-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          userID:id
        })
      }).then((res)=>res.json()).then((data)=>{console.log(data,"userDeleted")})
      window.localStorage.clear()
      window.location.href="/sign-in"
    }
    
  }
  return (
    
    <div className="container">
      <div className="profile">
        <h2>User Profile</h2>
        <p><strong>User ID:</strong> {userData.ID}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Full name:</strong> {userData.name}</p>
        <button className="logout-btn" onClick={()=>termindate(userData._id)}>Delete Account</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;

import '../Styles/UpdateInfo.css';
import React, {useState, useEffect } from 'react';
import Swal from 'sweetalert2'

const UpdateInfo = () => {
    const [entradasNew,setEntradasnew] = useState({newID: '',newnombre_completo: '', newusername:'', newpassword:''});
    const [userData, setUserData]= useState("")
    const onChange = (e) => setEntradasnew({...entradasNew, [e.target.name]: e.target.value});
    const {newID,newnombre_completo, newusername, newpassword} = entradasNew;
  
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

    //Method that updates the inputs of the user
    const modified = e => {
        e.preventDefault()
        if ((userData.ID!==newID && newID!=="")||
        (userData.username!==newusername && newusername!=="")||
        (userData.name!==newnombre_completo && newnombre_completo!=="")||
        (userData.password!==newpassword && newpassword!=="")) {
            
          userData.ID=newID
          userData.username=newusername
          userData.name=newnombre_completo
          fetch("http://localhost:5000/user-verified",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Acces-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            _id:userData._id,
            ID:userData.ID,
            name:userData.name,
            username:userData.username,
          })
        }).then((res)=>res.json()).then((data)=>{console.log(data,"userVerified")
          if(data.status==="A user with that ID already exists"){
            Swal.fire({
              title: 'A user with that ID already exists',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }else if(data.status==="A user with that username already exists"){
            Swal.fire({
              title: 'A user with that username already exists',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }else if(data.status==="A user with that full name already exists"){
            Swal.fire({
              title: 'A user with that full name already exists',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }else if(data.status==="Sucess"){
            window.localStorage.clear()
            window.location.href="/sign-in"
          }
          
        })
        }else {
          Swal.fire({
            title: 'Please fill all the spaces',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }

    }
   

  return (
    <form onSubmit={modified}>
        <div className="user-profile">
            <h2 className="profile-title">User Profile</h2>
            <div className="profile-info">
                <p><strong>User ID:</strong> <input type = "text" id="newuserID" name="newID" placeholder='Insert new value' value={newID} onChange={e => onChange(e)}/></p>
                <p><strong>Username:</strong> <input type = "text" id="newUsername" name="newusername" placeholder='Insert new value' value={newusername} onChange={e => onChange(e)}/></p>
                <p><strong>Full name:</strong> <input type = "text" id="fullname" name="newnombre_completo" placeholder='Insert new value' value={newnombre_completo} onChange={e => onChange(e)}/></p>
                <p><strong>Password:</strong> <input type = "password" id="newpassword" name="newpassword" placeholder='Insert new value' value={newpassword} onChange={e => onChange(e)}/></p>
                <input type="submit" value="Update account"/>
            </div>
        </div>
    </form>
  );
};

export default UpdateInfo;

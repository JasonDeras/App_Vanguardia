import '../Styles/UpdateInfo.css';
import React, {useState, useEffect } from 'react';

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
        if (userData.ID!==newID && newID!=="") {
            userData.ID=newID
            console.log(userData.id)
        }
        if (userData.username!==newusername && newusername!=="") {
            userData.username=newusername
            console.log(userData.username)
        }
        if (userData.name!==newnombre_completo && newnombre_completo!=="") {
            userData.name=newnombre_completo
            console.log(userData.name)
        }
        if (userData.password!==newpassword && newpassword!=="") {
            userData.password=newpassword
            console.log(userData.password)
        }
        console.log(userData)
        
    }

  return (
    <form onSubmit={modified}>
        <div className="user-profile">
            <h2 className="profile-title">User Profile</h2>
            <div className="profile-info">
                <p><strong>User ID:</strong> <input type = "text" id="newuserID" name="newID" placeholder='Insert new value' value={newID} onChange={e => onChange(e)}/></p>
                <p><strong>Username:</strong> <input type = "text" id="newUsername" name="newusername" placeholder='Insert new value' value={newusername} onChange={e => onChange(e)}/></p>
                <p><strong>Full name:</strong> <input type = "text" id="fullname" name="newnombre_completo" placeholder='Insert new value' value={newnombre_completo} onChange={e => onChange(e)}/></p>
                {/* <p><strong>Full name:</strong> <input type = "text" id="userfullname" name="nombre_completo" placeholder='Insert new value' value={newnombre_completo} onChange={e => onChange(e)}/></p> */}
                <p><strong>Password:</strong> <input type = "password" id="newpassword" name="newpassword" placeholder='Insert new value' value={newpassword} onChange={e => onChange(e)}/></p>
                <input type="submit" value="Update account"/>
            </div>
        </div>
    </form>
  );
};

export default UpdateInfo;

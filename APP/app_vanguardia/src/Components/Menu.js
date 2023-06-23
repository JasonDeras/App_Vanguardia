import React, { useState } from 'react';
import '../Styles/Menu.css';

const Menu = () => {

  const [image,setImage]=useState("")
  const [allimages,setallImages]=useState([])

  //Convert
  const convetToBase64=(e)=>{
    console.log(e)
    var reader=new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      console.log(reader.result)
      setImage(reader.result)
    }
    reader.onerror=error=>{
      console.log("Error",error)
    }
  }

  //Upload to data base
  const UploadImage =()=>{
    fetch("http://localhost:5000/upload-image",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Acces-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        base64:image
      })
    }).then((res)=>res.json()).then((data)=>{console.log(data)})
  }

  //Get form database
  const getImage=()=>{
    fetch("http://localhost:5000/upload-image",{
      method:"GET",
      
    }).then((res)=>res.json()).then((data)=>{setallImages(data.data)})
  }

  return (
    <form>
      <div className="menu-container">
        <div className="menu">
          <a href="/chatbot" className="menu-link">Chat Bot</a>
          <a href="/profile" className="menu-link">Profile</a>
          <a href="/home" className="menu-link">Home</a>
          <input accept='image/'type='file' onChange={convetToBase64}></input>
          {image==""||image==null?"":<img width={100} height={100} src={image}></img>}
          <button onClick={UploadImage}>Upload</button>
          {allimages.map(data=>{
            return(
              <img width={100} height={100} src={data.image}></img>
            )
          })}
        </div>
      </div>
    </form>
  );
};

export default Menu;

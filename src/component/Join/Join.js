import React,{useState} from 'react';
import './Join.css';

import {Link} from 'react-router-dom';

let user;
const presentUser=()=>{
  user=document.getElementById("joinInput").value;
  document.getElementById("joinInput").value="";
}
const Join = () => {
 
  const [name, setName] = useState("");

  return (
    <div className='JoinPage'>
       <div className="JoinContainer">
         <img src = "https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" alt="logo"/>
         <h1>Hehe</h1>
         <input onChange={(e)=> setName(e.target.value)} placeholder="Enter your name"  type="text" id="joinInput" />
         <Link onClick={(event) => !name? event.preventDefault():null} to='/chat'> <button onClick={presentUser} className="joinbtn">Login</button></Link>
         <h2>A Real time Chat Application :)</h2>
         <h3>© Deepak Verma</h3>
       </div>
    </div>
  )
}

export default Join;
export {user};
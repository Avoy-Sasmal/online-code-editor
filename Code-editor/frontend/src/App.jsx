import React, { use, useEffect } from 'react'
import { io } from "socket.io-client";
import { useState } from 'react';
import Editor from "@monaco-editor/react";

import "./App.css";
import { set } from 'mongoose';

const socket = io("http://localhost:5000");


const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
const [code,setCode] = useState("");
const [copySuccess,setCopySuccess] = useState("");
const [users,setUsers] = useState([]);
const [typing,setTyping] = useState("");


useEffect(()=>{
  socket.on("userJoined",(users)=>{
    setUsers(users);
  })

  socket.on("code-update",(newCode)=>{
    setCode(newCode);
  })

  socket.on("typing",({userName})=>{
    // show typing indicator
    console.log(`${userName} is typing...`);
    setTyping(`${userName.slice(0,8)} is typing...`);
    // hide typing indicator after 3 seconds of inactivity
    setTimeout(() => {
      setTyping("");
    }, 3000);
  })

  return ()=>{
    socket.off("userJoined");
    socket.off("code-update");
    socket.off("typing");
  }
},[])

useEffect(()=>{
  const handleBeforeUnload = (e) => {
socket.emit("leaveRoom");}
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
},[])

const joinRoom = () =>{
  console.log(roomId,userName);
  if(roomId && userName){
    socket.emit("join",{roomId,userName});
    setJoined(true);
  } 
}

const copyRoomId = async () => {
  navigator.clipboard.writeText(roomId);
  setCopySuccess("Room Id Copied");
  setTimeout(() => {
    setCopySuccess("");
  }, 2000);
}

const handleCodeChange = (newCode) => {
  setCode(newCode);
  socket.emit("code-change",{roomId,code:newCode});
  // socket.emit("code-change",{roomId,code:newCode});
  socket.emit("typing",{roomId,userName});
}

  
  if(!joined){
      return (
        <div>
          <div className="join-container">
            <div className="join-form">
              <h1>Join Code Room</h1>
              <input
                type="text"
                placeholder="Room Id "
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
              />

              <input
                type="text"
                placeholder="username "
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />

              <button onClick={joinRoom}>Join Room </button>
            </div>
          </div>
        </div>
      );
    }
     return (
       <div className="edito-container">
         <div className="sidebar">
           <div className="room-info">
             <h2>Code Room: {roomId}</h2>
             <button onClick={copyRoomId}></button>
             {copySuccess && <span className="copy-success">{copySuccess}</span>
              }
             <h3>users in Room </h3>
             <ul>
{users.map((user,index)=>(
  <li key={index}>{user}</li>
))}
             </ul>
             <p className="typing-indicator">user is Typing ... </p>
             <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
               <option value="javascript">JavaScript</option>
               <option value="python">Python</option>
               <option value="java">Java</option>
               <option value="cpp">c++</option>
             </select>
             <button className="leave-button">Leave Room</button>
           </div>
           <div className="editor-wrapper"></div>
           <Editor
             height={"100%"}
             defaultLanguage={language}
language={language}
value={code}
onChange={handleCodeChange}
theme='vs-dark'
options={{
  minimap:{enabled:false},
  fontSize:16,
  tabSize:2,
  automaticLayout:true
}}
           />
         </div>
       </div>
     );

}

export default App

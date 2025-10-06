import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

//rooms 
const room = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  let currentRoom = null ; 
  let currentUser = null ;
  socket.on("join",({roomId,userName  })=>{
    if(currentRoom){
      socket.leave(currentRoom);
      room.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit("userJoined",Array.from(room.get(currentRoom) ) )
    }

    currentRoom = roomId ;
    currentUser = userName ;

    socket.join(roomId);

    if(!room.has(roomId)){
      room.set(roomId,new Set() )
    }
    room.get(roomId).add(userName);

    io.to(roomId).emit("userJoined",Array.from(room.get(roomId) ) )
    console.log("user joined room",roomId,userName);

    socket.on("code-change",({roomId,code})=>{
      socket.in(roomId).emit("code-update",code);
    
  })

socket.on("leaveRoom", () => {
  console.log("leaving room", currentRoom, currentUser);
  if (currentRoom && currentUser) {
    room.get(currentRoom).delete(currentUser);
    io.to(currentRoom).emit("userJoined", Array.from(room.get(currentRoom)));
    socket.leave(currentRoom);
    currentRoom = null;
    currentUser = null;
  }
});
//typong indicator

socket.on("typing",({roomId,userName})=>{
  socket.in(roomId).emit("typing",{userName});
})


socket.on("disconnect",()=>{
  console.log("user disconnected"); 
  if(currentRoom && currentUser){
    room.get(currentRoom).delete(currentUser);
    io.to(currentRoom).emit("userJoined",Array.from(room.get(currentRoom) ) )
  }})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
});
  })

import { executeCode } from "../services/codeExecutor.js";
import {
  addUserToRoom,
  removeUserFromRoom,
  getRoom,
  getUsersInRoom,
} from "./roomManager.js";


export const socketEvents = (io, socket) => {
  console.log("User connected:", socket.id);

  let currentRoom = null;
  let currentUser = null;

  socket.on("join", ({ roomId, userName }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      removeUserFromRoom(currentRoom, currentUser);
      io.to(currentRoom).emit("userJoined", getUsersInRoom(currentRoom));
    }

    currentRoom = roomId;
    currentUser = userName;
    socket.join(roomId);

    addUserToRoom(roomId, userName);
    io.to(roomId).emit("userJoined", getUsersInRoom(roomId));

    console.log("User joined room:", roomId, userName);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-update", code);
  });

  socket.on("leaveRoom", () => {
    console.log("Leaving room", currentRoom, currentUser);
    if (currentRoom && currentUser) {
      removeUserFromRoom(currentRoom, currentUser);
      io.to(currentRoom).emit("userJoined", getUsersInRoom(currentRoom));
      socket.leave(currentRoom);
      currentRoom = null;
      currentUser = null;
    }
  });

  socket.on("typing", ({ roomId, userName }) => {
    socket.in(roomId).emit("typing", { userName });
  });

  socket.on("language-change", ({ roomId, language }) => {
    socket.in(roomId).emit("languageUpdate", language);
  });

  socket.on("compileCode", async ({ code, roomId, language, version }) => {
    const room = getRoom(roomId);
    if (room) {
      const result = await executeCode(code, language, version);
      room.output = result.run.output;
      io.to(roomId).emit("codeResponse", result);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    if (currentRoom && currentUser) {
      removeUserFromRoom(currentRoom, currentUser);
      io.to(currentRoom).emit("userJoined", getUsersInRoom(currentRoom));
    }
  });
};

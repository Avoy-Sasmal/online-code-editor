import {
    addUserToRoom,
    removeUserFromRoom,
    getUsersInRoom,
} from "../models/roomModel.js";

export const handleJoinRoom = (io, socket) => ({ roomId, userName }) => {
    if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
        removeUserFromRoom(socket.currentRoom, socket.currentUser);
        io.to(socket.currentRoom).emit("userJoined", getUsersInRoom(socket.currentRoom));
    }

    socket.currentRoom = roomId;
    socket.currentUser = userName;
    socket.join(roomId);

    addUserToRoom(roomId, userName);
    io.to(roomId).emit("userJoined", getUsersInRoom(roomId));

    console.log("User joined room:", roomId, userName);
};

export const handleLeaveRoom = (io, socket) => () => {
    const { currentRoom, currentUser } = socket;
    console.log("Leaving room", currentRoom, currentUser);
    if (currentRoom && currentUser) {
        removeUserFromRoom(currentRoom, currentUser);
        io.to(currentRoom).emit("userJoined", getUsersInRoom(currentRoom));
        socket.leave(currentRoom);
        socket.currentRoom = null;
        socket.currentUser = null;
    }
};

export const handleDisconnect = (io, socket) => () => {
    const { currentRoom, currentUser } = socket;
    console.log("User disconnected");
    if (currentRoom && currentUser) {
        removeUserFromRoom(currentRoom, currentUser);
        io.to(currentRoom).emit("userJoined", getUsersInRoom(currentRoom));
    }
};

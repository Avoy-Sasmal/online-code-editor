import {
    handleJoinRoom,
    handleLeaveRoom,
    handleDisconnect,
} from "../controllers/roomController.js";
import {
    handleCodeChange,
    handleTyping,
    handleLanguageChange,
    handleCompileCode,
} from "../controllers/codeController.js";

export const registerSocketHandlers = (io, socket) => {
    socket.on("join", handleJoinRoom(io, socket));
    socket.on("code-change", handleCodeChange(io, socket));
    socket.on("leaveRoom", handleLeaveRoom(io, socket));
    socket.on("typing", handleTyping(io, socket));
    socket.on("language-change", handleLanguageChange(io, socket));
    socket.on("compileCode", handleCompileCode(io, socket));
    socket.on("disconnect", handleDisconnect(io, socket));
};

import { executeCode } from "../services/codeService.js";
import { getRoom } from "../models/roomModel.js";

export const handleCodeChange = (io, socket) => ({ roomId, code }) => {
    socket.in(roomId).emit("code-update", code);
};

export const handleTyping = (io, socket) => ({ roomId, userName }) => {
    socket.in(roomId).emit("typing", { userName });
};

export const handleLanguageChange = (io, socket) => ({ roomId, language }) => {
    socket.in(roomId).emit("languageUpdate", language);
};

export const handleCompileCode = (io, socket) => async ({ code, roomId, language, version, stdin }) => {
    console.log(`Compiling code for room ${roomId}:`, { language, version, stdinLength: stdin?.length });
    const room = getRoom(roomId);
    if (room) {
        try {
            const result = await executeCode(code, language, version, stdin);
            console.log(`Execution successful for room ${roomId}`);
            io.to(roomId).emit("codeResponse", result);
        } catch (error) {
            console.error(`Execution failed for room ${roomId}:`, error.message);
            io.to(roomId).emit("codeResponse", { error: "Code execution failed" });
        }
    }
};

import express from "express";
import http from "http";
import dotenv from "dotenv"
dotenv.config();
import { Server } from "socket.io";
import { registerSocketHandlers } from "./routes/socket.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Realtime Code Collaboration Server is running (Modular Structure)");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    registerSocketHandlers(io, socket);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

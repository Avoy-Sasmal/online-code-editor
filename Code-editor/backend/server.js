import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { initSocket } from "./socket/index.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Realtime Code Collaboration Server is running");
});

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});

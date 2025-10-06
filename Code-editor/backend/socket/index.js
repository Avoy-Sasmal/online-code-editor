import { Server } from "socket.io";
import { socketEvents } from "./events.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => socketEvents(io, socket));

  return io;
};

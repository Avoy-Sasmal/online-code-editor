import { io } from "socket.io-client";
import { SERVER_URL } from "../constants/config";

const socket = io(SERVER_URL);

export default socket;

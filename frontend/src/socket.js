import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.SOCKET_BACKEND_URL;

export const socket = io(SOCKET_URL)

import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_BACKEND_URL;
console.log("URL",SOCKET_URL)

// export const socket = io(SOCKET_URL)
export const socket = io("http://localhost:3001")

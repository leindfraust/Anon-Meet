import {
    io
} from "socket.io-client"
const URL = "http://localhost:5000"
const socket = io(process.env.PORT,{
    autoConnect: false
});

export default socket;
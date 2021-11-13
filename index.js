const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});

//usages
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(history());
app.use(express.static(path.join(__dirname, 'libak-chat/dist')))

//io connection
io.on('connection', (socket) => {
    let roomNo = null
    socket.on('join room', (roomID, hostMsg) => {
        socket.join(roomID)
        console.log(socket.rooms)
        roomNo = roomID
        io.to(roomNo).emit('host message', hostMsg, roomID);
    });
    socket.on('leave room', (roomID, hostMsg) => {
        socket.leave(roomID)
        io.to(roomID).emit('host message', hostMsg)
    });
    console.log('Client connected');
    socket.on('connect', () => console.log('Client connected'))
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('message', (msg, user, userPic) => {
        io.to(roomNo).emit('chat message', msg, user, userPic);
    });
});

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'libak-chat/dist/index.html'))

});
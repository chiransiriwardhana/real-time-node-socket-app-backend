const express = require('express')
const cors = require('cors')

const app = express();
const http = require('http');
const { Server } = require('socket.io');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("mouse_activity", (data) => {
        console.log(data);
        socket.broadcast.emit('all_mouse_activity', {session_id: socket.id, coords: data})
        console.log(socket.id)
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})

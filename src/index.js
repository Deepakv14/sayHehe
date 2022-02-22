const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;
app.use(cors()); //CORS is used for Inter URl communication
app.get('/', (req, res) => {
    res.send("We are gonna create a Real time chat app!");
});
const users = [{}];
io.on('connection', (socket) => {
    console.log("New Connection");
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined!`);

        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}!` });
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
    })
    socket.on('message', ({ message, id }) => {
        // socket.broadcast.emit --> to everyone except user
        // socket.emit --> to user only
        io.emit('sendMessage', { user: users[id], message, id })

    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} left the chat!` });
    })
})
server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})
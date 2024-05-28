import http from "http";
import express from 'express';
import { Server } from "socket.io";
import { handler } from './build/handler.js';

// setup servers
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// current users
const users = {}

// add socket.io debug handler
io.on('connection', (socket) => {
    // create new user
    const user = {
        id: Date.now(),
        name: "Unbekannter",
        message: "",
    }
    users[user.id] = user

    // notify about user join
    console.log('user connected', socket.id);
    io.emit("self", { userId: user.id, user: user })
    socket.emit("join", { userId: user.id, user: user })

    // forward user messages with their id
    socket.on('update', (update) => {
        console.log('user update', user.id, update);
        io.emit("update", { userId: user.id, update: update })
    });

    // notify about user leave
    socket.on('disconnect', () => {
        console.log('user disconnect', user.id);
        io.emit("leave", { userId: user.id })
    });
});

// integrate frontend
app.use(handler);

// start server
app.listen(3000, () => {
    console.log('listening on port 3000');
});

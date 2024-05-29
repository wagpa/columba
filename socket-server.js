import {Server} from "socket.io";
import {name} from "./names.js";

export const socketDevServer = {
    name: 'socket-server',
    configureServer(server) {
        injectSocket(server.httpServer);
    }
}

export function injectSocket(server) {
    const io = new Server(server);

    // current users
    const users = {}

    // add socket.io debug handler
    io.on('connection', (socket) => {
        const room = socket.handshake.headers.room ?? "default"
        console.log('user connected', socket.id, room);

        // join room
        socket.join(room)

        // create new user
        const user = {
            id: Date.now(),
            name: name(),
            message: "",
        }
        users[user.id] = user

        // notify about user join
        socket.emit("self", { userId: user.id, user: user, users: users })
        io.emit("join", { userId: user.id, user: user })

        // forward user messages with their id
        socket.on('update', (update) => {
            console.log('user update', user.id, update);
            users[user.id] = {...users[user.id], ...update}
            io.emit("update", { userId: user.id, user: users[user.id] })
        });

        // notify about user leave
        socket.on('disconnect', () => {
            console.log('user disconnect', user.id);
            delete users[user.id]
            io.emit("leave", { userId: user.id })
        });
    });
}

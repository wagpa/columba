// TODO start devserver: https://dev.to/theether0/sveltekit-with-socketio-and-nodejs-285h
import {Server} from "socket.io";

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
        // create new user
        const user = {
            id: Date.now(),
            name: "Unbekannter",
            message: "",
        }
        users[user.id] = user

        // notify about user join
        console.log('user connected', socket.id);
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

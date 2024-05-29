import express from 'express';
import { handler } from '../build/handler.js';
import {injectSocket} from "./socket-server.js";

// setup servers
const app = express();

// start server
const server = app.listen(3000, () => {
    console.log('listening on port 3000');
});

// integrate socket.io server and frontend
injectSocket(server)
app.use(handler);

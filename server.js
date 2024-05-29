import http from "http";
import express from 'express';
import { handler } from './build/handler.js';
import {injectSocket} from "./socket-server.js";

// setup servers
const app = express();
const server = http.createServer(app);

// integrate socket.io server and frontend
injectSocket(server)
app.use(handler);

// start server
app.listen(3000, () => {
    console.log('listening on port 3000');
});

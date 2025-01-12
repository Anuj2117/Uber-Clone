import http from "http"
import express from "express"
//import app from "./index.js"
import { initializeSocket } from './socket.js';

const app=express()

const port = process.env.PORT ;

const server = http.createServer(app);

initializeSocket(server);

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

export  {server,app}
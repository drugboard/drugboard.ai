import http from "http";
import express from "express";
import dotenv from 'dotenv';
dotenv.config({
    path:".env"
});

const app = express()

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8001
httpServer.listen(PORT, ()=>{
    console.log(`HTTP Server is running on the port ${PORT}`)
})

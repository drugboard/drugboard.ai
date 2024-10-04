import http from "http";
import express from "express";
import dotenv from 'dotenv';
dotenv.config({
    path:".env"
});

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to drugboard.ai API..."
    });
})

const drugboardServer = http.createServer(app);

export default drugboardServer;
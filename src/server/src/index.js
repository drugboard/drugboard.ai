import http from "http";
import express from "express";
import dotenv from 'dotenv';
import { PORT } from "./constants.js";
import { connectMongoDB } from "./db/mongodb/index.js";
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

const httpServer = http.createServer(app);

const port = PORT || 8001;
httpServer.listen(port, async()=>{
    console.log(`🚀 HTTP Server is running on the port ${port}`)
    await connectMongoDB();
})

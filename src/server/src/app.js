import http from "http";
import express from "express";

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to drugboard.ai API..."
    });
})

const drugboardServer = http.createServer(app);

export default drugboardServer;
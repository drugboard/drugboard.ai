import http from "http";
import express from "express";
import cors from 'cors';

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://drugboard.vercel.app"
  ];
  
  // CORS options
   const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());

//All Routes Imports
import aiRouter from "./routes/ai.routes.js";

app.use("/api/v1/ai", aiRouter);

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to drugboard.ai API..."
    });
})

// Endpoint to keep the server alive
app.get('/keep-alive', (req, res) => {
  console.log("Server is running alive 🚀");
  res.status(200).json({
    isAlive: true
  });
});

const drugboardServer = http.createServer(app);

export default drugboardServer;
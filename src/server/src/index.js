import drugboardServer from './app.js'
import { PORT } from "./constants.js";
// import connectMongoDB from "./db/mongodb/index.js";
import fetch from "node-fetch";
import moment from 'moment';

const launchDrugboardServer = async () => {
    // try{
    //     const mongoDBInstance = await connectMongoDB();
    //     if(mongoDBInstance?.connection?.host){
    //         const port = PORT || 8001;
    //         drugboardServer.listen(port, async()=>{
    //             console.log(`🚀 HTTP Server is running on the port ${port}\n`)
    //         })
    //     }
    // }catch(error){
    //     console.log("Error in starting Drugboard Server: \n", error);
    // }
    try{
        const keepAlive = () => {
            fetch('https://drugboard-ai.onrender.com/keep-alive')
              .then((res) => console.log('Server is alive:', moment().format('DD-MM-YYYY HH:mm:ss')))
              .catch((err) => console.error(`\nServer is dead: ${moment().format('DD-MM-YYYY HH:mm:ss')}\n`, err));
          };
          
          // Ping every 30seconds
          setInterval(keepAlive, 30000);
        const port = PORT || 8001;
        drugboardServer.listen(port, async()=>{
            console.log(`🚀 HTTP Server is running on the port ${port}\n`)
        })
    }catch(error){
        console.log("Error in starting Drugboard Server: \n", error);
    }
}

launchDrugboardServer();
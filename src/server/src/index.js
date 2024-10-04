import dotenv from "dotenv"
import drugboardServer from './app.js'
import { PORT } from "./constants.js";
import connectMongoDB from "./db/mongodb/index.js";

dotenv.config({
    path: './.env'
})


const launchDrugboardServer = async () => {
    try{
        const mongoDBInstance = await connectMongoDB();
        if(mongoDBInstance?.connection?.host){
            const port = PORT || 8001;
            drugboardServer.listen(port, async()=>{
                console.log(`🚀 HTTP Server is running on the port ${port}`)
            })
        }
    }catch(error){
        console.log("Error in starting Drugboard Server: \n", error);
    }
}

launchDrugboardServer();
import mongoose from 'mongoose';
import { DB_NAME, MONGO_DB_URL } from '../../constants.js';

export const connectMongoDB = async() => {
    try{
        const mongoDBInstance = await mongoose.connect(`${MONGO_DB_URL}/${DB_NAME}`);
        console.log("🟢 MongoDB is connected successfully! \nDB Host: ", mongoDBInstance?.connection?.host);
    }catch(error){
        console.log("🧧 Error in connecting to the MongoDB: ", error);
        process.exit(1);
    }
}
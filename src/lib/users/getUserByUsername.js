import db from "@/services/backend/appwrite/database.config";
import { isObjEmpty } from "@/utils/Obj.util";
import { Query } from "appwrite";
import { redirect } from "next/navigation";

export const getUserByUsername = async(username) => {
    try{
        const data = await db.users.getAllDocs([Query.equal("username", [username])]);
        // console.log(data);
        
        if(!data.length){
            return null;
        }
    
        const user = data[0];
    
        if(isObjEmpty(user)){
            return null;
        }
    
        return user;
    }catch(error){
        console.error(error);
        console.log("Error Message: ",error.message);
        redirect("/onboarding");
    }
}
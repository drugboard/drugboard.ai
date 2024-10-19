import { Functions, ExecutionMethod } from "appwrite";
import { getAllUsersFuncID, getUserByIDFuncID } from "../constants";
import { appwriteClient } from ".";

const functions = new Functions(appwriteClient);

const funcs = [
    {
        "functionID": getAllUsersFuncID,
        "name": "getAllUsers"
    },
    {
        "functionID": getUserByIDFuncID,
        "name": "getUserByID"
    }
];

const awFuncs = {};


funcs.forEach((func)=>{
    awFuncs[func.name] = {
        get: async (BODY="", isAsync=false, PATH="/", HEADERS={}) => {
            const response = await functions.createExecution(
                func.functionID,
                BODY,
                isAsync, 
                PATH,
                ExecutionMethod.GET,
                HEADERS
            );
            const body = response.responseBody;
            // console.log("body: ", body);
            const data = JSON.parse(body);
            // console.log("Data: ", data);
            return data;
        }
    }
})

export default awFuncs;
"use client";
import { Functions, Client, ExecutionMethod } from "appwrite";
import { getAllUsersFuncID, getUserByIDFuncID } from "../constants";

const functions = new Functions(Client);

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
        execute: async (BODY, isAsync=false, PATH="/", METHOD="GET", HEADERS={}, scheduledAt='' ) => {
            const response = await functions.createExecution(
                func.functionID,
                BODY,
                isAsync, 
                PATH,
                METHOD==="GET" && ExecutionMethod.GET, 
                METHOD==="POST" && ExecutionMethod.POST, 
                METHOD==="PUT" && ExecutionMethod.PUT, 
                METHOD==="DELETE" && ExecutionMethod.DELETE, 
                HEADERS, 
                scheduledAt
            );
            return response;
        }
    }
})

export default awFuncs;
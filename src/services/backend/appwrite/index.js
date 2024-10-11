import { Client } from "appwrite";
import { endpoint, projectId } from "../constants";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(`${endpoint}`)
  .setProject(`${projectId}`);
  
export { appwriteClient };

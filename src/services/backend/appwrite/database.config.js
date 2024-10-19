"use client";
import { Databases, ID } from "appwrite";
import { databaseID, postDraftsID, postFilesID, postLinksID, postsID, postTagsID } from "../constants";
import { appwriteClient } from ".";

const databases = new Databases(appwriteClient);

const collections = [
    {
        'databaseID': databaseID,
        '$id': postsID,
        'name': 'posts'
    },
    {
        'databaseID': databaseID,
        '$id': postDraftsID,
        'name': 'postDrafts'
    },
    {
        'databaseID': databaseID,
        '$id': postFilesID,
        'name': 'postFiles'
    },
    {
        'databaseID': databaseID,
        '$id': postLinksID,
        'name': 'postLinks'
    },
    {
        'databaseID': databaseID,
        '$id': postTagsID,
        'name': 'postTags'
    }
];

const db = {};

collections.forEach((collection)=>{
    db[collection.name] = {
        createDoc: async (PAYLOAD={}, PERMISSIONS=[]) => {
            const newDoc = await databases.createDocument(
              collection.databaseID,
              collection.$id,
              ID.unique(),
              PAYLOAD,
              PERMISSIONS
            );
            return newDoc;
        },

        getAllDocs: async (QUERIES=[]) => {
            const docs = await databases.listDocuments(
                collection.databaseID,
                collection.$id,
                QUERIES
            );
            return docs?.documents;
        },

        getDoc: async (DOCUMENT_ID, QUERIES=[]) => {
            const doc = await databases.getDocument(
                collection.databaseID,
                collection.$id,
                DOCUMENT_ID,
                QUERIES
            );
            return doc;
        },
    }
});

export default db;
import dotenv from 'dotenv';
dotenv.config({
    path: "./.env"
});

export const PORT = process.env.PORT;

export const CLOUDINARY_NAME = process.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.CLOUDINARY_API_SECRET;

export const MONGO_DB_URL = process.env.MONGO_DB_URL;
export const DB_NAME = process.env.DB_NAME;
import dotenv from 'dotenv';
dotenv.config()

export const config = {
    PORT: process.env.PORT || 5000,
    ORIGIN: process.env.ORIGIN,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/notes",
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,

}
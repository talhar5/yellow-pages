export const config = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    DATABASE_URL: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/notes"
}
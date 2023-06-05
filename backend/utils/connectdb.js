import mongoose from 'mongoose';
import { config } from '../config.js'


export default function connectDb() {
    mongoose.connect(config.DATABASE_URL)
        .then(() => {
            console.log("Database has been connected successfully")
        })
        .catch(err => {
            console.log("Error occured while connecting the database")
            console.log(err)
        })
}

import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    
})



const User = model('User', userSchema);
export default User;

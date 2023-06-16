import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: String,
    otp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }

})



const User = model('User', userSchema);
export default User;

import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: String,
    noteBody: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})



const Note = model('Note', noteSchema);
export default Note;

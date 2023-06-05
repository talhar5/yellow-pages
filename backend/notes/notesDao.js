import Note from '../models/Note.js';


async function getAllNotes(userId, done) {
    Note.find({ userId })
        .then(notes => {
            return done(null, notes);
        })
        .catch(err => {
            return done({
                code: 500,
                error: err
            })
        })
}

async function getOneNote(noteId, done) {
    Note.findById(noteId)
        .then(note => {
            if (note) {
                return done(null, note);
            }
            return done({
                code: 404,
                error: "Note not found"
            })
        })
        .catch(err => {
            return done({
                code: 500,
                error: err
            })
        })
}

async function createNote({ title, noteBody, userId }, done) {
    console.log(noteBody)
    let newNote = new Note({
        title,
        noteBody,
        userId
    })
    newNote.save()
        .then(savedNote => {
            console.log(savedNote)
            return done(null, savedNote);
        })
        .catch(err => {
            return done({
                code: 500,
                error: err
            })
        })
}
async function updateNote(noteId, { title, noteBody }, done) {
    Note.findOneAndUpdate({ _id: noteId }, { title, noteBody })
        .then(updatedNote => {
            return done(null, updatedNote);
        })
        .catch(err => {
            return done({
                code: 500,
                error: err
            })
        })
}
async function deleteNote(noteId, done) {
    console.log(noteId)
    Note.findByIdAndDelete(noteId)
        .then(note => {
            if (!note) {
                return done({
                    code: 404,
                    error: "Note not found"
                })
            }
            return done(null, note);
        })
        .catch(err => {
            return done({
                code: 500,
                error: err
            })
        })
}






export default {
    getAllNotes,
    getOneNote,
    createNote,
    deleteNote,
    updateNote
}
import notesDao from "./notesDao.js";

function getAllNotes(userId, done) {
    notesDao.getAllNotes(userId, done);
}

function getOneNote(noteId, done) {
    notesDao.getOneNote(noteId, done);
}

function createNote(noteDetails, done) {
    notesDao.createNote(noteDetails, done);
}

function updateNote(noteId, noteDetails, done) {
    notesDao.updateNote(noteId, noteDetails, done)
}

function deleteNote(noteId, done) {
    notesDao.deleteNote(noteId, done);
}






export default {
    getAllNotes,
    getOneNote,
    createNote,
    deleteNote,
    updateNote
}
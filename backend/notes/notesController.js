import notesService from "./notesService.js"

async function getAllNotes(req, res) {
    let userId = req.claims.userId;
    notesService.getAllNotes(userId, (err, notes) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(notes)
    })
}

async function getOneNote(req, res) {
    let { noteId } = req.params;
    console.log(noteId)
    notesService.getOneNote(noteId, (err, note) => {
        if (err) {
            if (err.code === 500) {
                return res.status(500).json({
                    error: "Internal Server Error"
                })
            }
            if (err.code === 404) {
                return res.status(404).json({
                    error: "Note not found"
                })
            }
        }
        return res.status(200).json(note);
    })
}

async function createNote(req, res) {
    let userId = req.claims.userId;
    let {
        title,
        noteBody
    } = req.body

    let noteDetails = {
        title,
        noteBody,
        userId
    }
    console.log(noteDetails)
    notesService.createNote(noteDetails, (err, savedNote) => {
        if (err) {
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
        return res.status(201).json(savedNote);
    })
}
async function updateNote(req, res) {
    let { noteId, title, noteBody } = req.body;
    notesService.updateNote(noteId, { title, noteBody }, (err, updatedNote) => {
        if (err) {
            return res.status(500).json({
                error: "Internal Server Error"
            })
        }
        return res.status(200).json({
            message: "Note updated successfully",
            updateNote: updatedNote
        })
    })
}

async function deleteNote(req, res) {
    let noteId = req.params.noteId;
    notesService.deleteNote(noteId, (err, deletedNote) => {
        if (err) {
            if (err.code === 500) {
                return res.status(500).json({
                    error: "Internal Server Error"
                })
            }
            if (err.code === 404) {
                return res.status(404).json({
                    error: "note not found"
                })
            }
        }
        return res.status(200).json({
            message: "note has been deleted.",
            deletedNote: deletedNote
        })
    })
}


export default {
    getAllNotes,
    getOneNote,
    createNote,
    updateNote,
    deleteNote,
}
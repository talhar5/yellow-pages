import { Router } from 'express';
const notesRouter = Router();
import notesController from './notesController.js';

// /notes router

// GET routes
notesRouter.get('/all', notesController.getAllNotes);
notesRouter.get('/:noteId', notesController.getOneNote);

// POST routes
notesRouter.post('/', notesController.createNote);

// PUT
notesRouter.put('/', notesController.updateNote);

// DELETE
notesRouter.delete('/:noteId', notesController.deleteNote);



export default notesRouter;
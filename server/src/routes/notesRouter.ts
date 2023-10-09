import express from 'express';
import { verifyLogin } from '../middlewares/verifyLogin';
import { createNote } from '../controllers/notes/createNote';
import { readNotes } from '../controllers/notes/readNotes';
import { readNote } from '../controllers/notes/readNote';
import { updateNote } from '../controllers/notes/updateNote';
import { deleteNote } from '../controllers/notes/deleteNote';
import { verifyNoteOwnership } from '../middlewares/verifyNoteOwnership';

const router = express.Router();
router.use(verifyLogin);

router.post('/', createNote);
router.get('/', readNotes);
router.get('/:id', verifyNoteOwnership, readNote);
router.put('/:id', verifyNoteOwnership, updateNote);
router.delete('/:id', verifyNoteOwnership, deleteNote);

export { router as notesRouter };

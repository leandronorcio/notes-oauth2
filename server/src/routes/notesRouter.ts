import express from 'express';
import { verifyLogin } from '../middlewares/verifyLogin';
import { createNote } from '../controllers/notes/createNote';
import { readNotes } from '../controllers/notes/readNotes';
import { readNote } from '../controllers/notes/readNote';
import { updateNote } from '../controllers/notes/updateNote';
import { deleteNote } from '../controllers/notes/deleteNote';

const router = express.Router();
router.use(verifyLogin);

router.post('/', createNote);
router.get('/', readNotes);
router.get('/:id', readNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export { router as notesRouter };

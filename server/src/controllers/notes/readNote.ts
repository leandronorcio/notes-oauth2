import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const readNote: RequestHandler = async (req, res) => {
  // The `verifyLogin()` middleware guarantees that we get a `res.locals.userId` in this request handler
  const userId = res.locals.userId as number;

  try {
    const noteId = parseInt(req.params.id);
    const note = await NoteModel.findUnique(userId, noteId);
    if (!note) return res.sendStatus(404);
    res.send(note);
  } catch (error) {
    res.sendStatus(500);
  }
};

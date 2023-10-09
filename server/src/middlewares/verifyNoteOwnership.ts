import { RequestHandler } from 'express';
import NoteModel from '../models/note';

export const verifyNoteOwnership: RequestHandler = async (req, res, next) => {
  // The `verifyLogin()` middleware guarantees that we get a `res.locals.userId` in this request handler
  const userId = res.locals.userId as number;
  try {
    const noteId = parseInt(req.params.id);
    if (!(await NoteModel.verifyOwnership(userId, noteId))) {
      return res
        .status(403)
        .json({ error: 'You do not have access to this note.' });
    }

    next();
  } catch (error) {
    res.send(500);
  }
};

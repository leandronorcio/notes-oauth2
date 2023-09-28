import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const deleteNote: RequestHandler = async (req, res) => {
  // The `verifyLogin()` middleware guarantees that we get a `res.locals.userId` in this request handler
  const userId = res.locals.userId as number;

  try {
    const noteId = parseInt(req.params.id);
    if (!(await NoteModel.verifyOwnership(userId, noteId))) {
      return res.sendStatus(403);
    }

    const id = await NoteModel.delete(noteId);
    res.send({ id });
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

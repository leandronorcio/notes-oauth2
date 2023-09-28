import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const updateNote: RequestHandler = async (req, res) => {
  // The `verifyLogin()` middleware guarantees that we get a `res.locals.userId` in this request handler
  const userId = res.locals.userId as number;

  try {
    const noteId = parseInt(req.params.id);
    if (!(await NoteModel.verifyOwnership(userId, noteId))) {
      return res.sendStatus(403);
    }

    const title = req.body.title;
    const content = req.body.content;

    const notes = await NoteModel.update(noteId, title, content);
    res.send(notes);
  } catch (error) {
    res.send(500);
  }
};

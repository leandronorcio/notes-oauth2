import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const readNotes: RequestHandler = async (req, res) => {
  // The `verifyLogin()` middleware guarantees that we get a `res.locals.userId` in this request handler
  const userId = res.locals.userId as number;

  try {
    const notes = await NoteModel.listAll(userId);
    res.send(notes);
  } catch (error) {
    res.send(500);
  }
};

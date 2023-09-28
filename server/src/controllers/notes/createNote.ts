import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const createNote: RequestHandler = async (req, res) => {
  // The `verifyLogin()` middleware guarantees that we get a `res.locals.userId` in this request handler
  const userId = res.locals.userId as number;

  try {
    const id = await NoteModel.create(userId);
    res.send({ id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

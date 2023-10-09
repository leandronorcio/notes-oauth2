import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const deleteNote: RequestHandler = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    const id = await NoteModel.delete(noteId);
    res.send({ id });
  } catch (error) {
    res.send(500);
  }
};

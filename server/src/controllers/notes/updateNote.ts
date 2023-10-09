import { RequestHandler } from 'express';
import NoteModel from '../../models/note';

export const updateNote: RequestHandler = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id);

    const title = req.body.title;
    const content = req.body.content;

    const notes = await NoteModel.update(noteId, title, content);
    res.send(notes);
  } catch (error) {
    res.send(500);
  }
};

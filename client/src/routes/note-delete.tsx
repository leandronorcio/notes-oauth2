import { deleteNote } from '@/lib/notesApi';
import { Paths } from '@/router';
import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  redirect,
} from 'react-router-dom';

interface DeleteNoteActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.noteDetail>>;
  accessToken: string;
}

export async function deleteNoteAction({
  accessToken,
  params,
}: DeleteNoteActionArgs) {
  await deleteNote({
    accessToken,
    id: parseInt(params.noteId!),
  });

  return redirect('/notes');
}

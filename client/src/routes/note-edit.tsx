import { Container } from '@/components/container';
import {
  ActionFunctionArgs,
  Form,
  ParamParseKey,
  Params,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { noteDetailLoader } from './note-detail';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { updateNote } from '@/lib/notesApi';
import { Paths } from '@/router';

interface EditNoteActionArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.noteDetail>>;
  accessToken: string;
}

export async function editNoteAction({
  accessToken,
  params,
  request,
}: EditNoteActionArgs) {
  const formData = await request.formData();
  const { id } = await updateNote({
    accessToken,
    id: parseInt(params.noteId!),
    title: (formData.get('title') || '') as string,
    content: (formData.get('content') || '') as string,
  });

  return redirect(`/notes/${id}`);
}

export function NoteEdit() {
  // Use the same `loader` function of the `/note/:noteId` route
  const note = useLoaderData() as Awaited<ReturnType<typeof noteDetailLoader>>;
  const [noteValue, setNoteValue] = useState({
    title: note?.title || '',
    content: note?.content || '',
  });

  const navigate = useNavigate();
  const { formAction, state } = useNavigation();
  const isSubmitting =
    formAction === `/notes/${note?.id}/edit` && state === 'submitting';

  return (
    <Form method="POST">
      <Container className="flex flex-col gap-3">
        <div>
          <Label htmlFor="note-title">Title</Label>
          <Input
            value={noteValue.title}
            onChange={(e) =>
              setNoteValue((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Untitled note"
            id="note-title"
            name="title"
          />
        </div>
        <div>
          <Label htmlFor="note-content">Content</Label>
          <Textarea
            value={noteValue.content || ''}
            onChange={(e) =>
              setNoteValue((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="No content"
            id="note-content"
            name="content"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </div>
      </Container>
    </Form>
  );
}

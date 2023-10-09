import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { readNote } from '@/lib/notesApi';
import { cn } from '@/lib/utils';
import { Paths } from '@/router';
import { Pencil, Trash2 } from 'lucide-react';
import {
  ActionFunctionArgs,
  Params,
  ParamParseKey,
  useLoaderData,
  useNavigate,
  Form,
} from 'react-router-dom';

interface NoteDetailLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.noteDetail>>;
  accessToken: string;
}

export async function noteDetailLoader({
  params,
  accessToken,
}: NoteDetailLoaderArgs) {
  return await readNote({ id: parseInt(params.noteId!), accessToken });
}

export function NoteDetail() {
  const note = useLoaderData() as Awaited<ReturnType<typeof noteDetailLoader>>;
  const navigate = useNavigate();

  return (
    <Container>
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={() => navigate('edit')}>
          <Pencil className="mr-2" size={20} /> Edit
        </Button>
        <Form
          method="POST"
          action="delete"
          onSubmit={(event) => {
            if (!confirm('Please confirm you want to delete this record.')) {
              event.preventDefault();
            }
          }}
        >
          <Button type="submit" variant="destructive">
            <Trash2 className="mr-2" size={20} />
            Delete
          </Button>
        </Form>
      </div>
      <h1 className="text-4xl font-semibold mb-4">
        {note?.title || 'Untitled note'}
      </h1>
      <p
        className={cn(
          'text-lg',
          !note?.content && 'text-muted-foreground italic'
        )}
      >
        {note?.content || 'No content.'}
      </p>
    </Container>
  );
}

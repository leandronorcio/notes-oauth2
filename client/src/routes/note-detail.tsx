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
} from 'react-router-dom';

interface NoteDetailLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.noteDetail>>;
  accessToken: string | null;
}

export async function noteDetailLoader({
  params,
  accessToken,
}: NoteDetailLoaderArgs) {
  return accessToken
    ? await readNote({ id: parseInt(params.noteId!), accessToken })
    : null;
}

export function NoteDetail() {
  const note = useLoaderData() as Awaited<ReturnType<typeof noteDetailLoader>>;

  return (
    <Container>
      <div className="flex gap-3 justify-end">
        <Button variant="secondary">
          <Pencil className="mr-2" size={20} /> Edit
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2" size={20} />
          Delete
        </Button>
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

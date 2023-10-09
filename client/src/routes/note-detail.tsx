import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { readNote } from '@/lib/notesApi';
import { cn } from '@/lib/utils';
import { Paths } from '@/router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
  accessToken: string | null;
}

export async function noteDetailLoader({
  params,
  accessToken,
}: NoteDetailLoaderArgs) {
  if (!accessToken) return null;
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="submit" variant="destructive">
              <Trash2 className="mr-2" size={20} />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really wish to delete this note?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Form method="POST" action="delete">
                <AlertDialogAction asChild>
                  <Button type="submit" variant="destructive">
                    Delete
                  </Button>
                </AlertDialogAction>
              </Form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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

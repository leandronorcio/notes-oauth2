import { Container } from '@/components/container';
import { useLoaderData } from 'react-router-dom';
import { noteDetailLoader } from './note-detail';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function NoteEdit() {
  // Use the same `loader` function of the `/note/:noteId` route
  const note = useLoaderData() as Awaited<ReturnType<typeof noteDetailLoader>>;

  return (
    <Container className="flex flex-col gap-3">
      <div>
        <Label htmlFor="note-title">Title</Label>
        <Input
          value={note?.title || ''}
          placeholder="Untitled note"
          id="note-title"
        />
      </div>
      <div>
        <Label htmlFor="note-content">Content</Label>
        <Textarea
          value={note?.content || ''}
          placeholder="No content"
          id="note-content"
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </div>
    </Container>
  );
}

import { Button } from '@/components/ui/button';
import { useSession } from '@/hooks/useSession';
import { createNote } from '@/lib/notesApi';
import { FilePlus } from 'lucide-react';

export function CreateNote() {
  const { accessToken } = useSession();

  return (
    <Button
      className="flex gap-2 w-full"
      onClick={() => createNote({ accessToken: accessToken! })}
    >
      <FilePlus /> Create note
    </Button>
  );
}

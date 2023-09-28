import { Button } from '@/components/ui/button';
import { useNotesApi } from '@/hooks/useNotesApi';
import { FilePlus } from 'lucide-react';

export function CreateNote() {
  const { create } = useNotesApi();

  return (
    <Button
      className="flex gap-2 w-full"
      onClick={() => {
        create();
        console.log('clicked');
      }}
    >
      <FilePlus /> Create note
    </Button>
  );
}

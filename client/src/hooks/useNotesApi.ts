import { createNote } from '@/lib/notesApi';
import { useSession } from './useSession';

export function useNotesApi() {
  const { accessToken } = useSession();

  const create = () => createNote({ accessToken });

  return { create };
}

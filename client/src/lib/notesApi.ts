import { Note } from '@/types';

export async function createNote({ accessToken }: { accessToken: string }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw Error('Error creating note.');

  return (await res.json()) as { id: number };
}

// For reading all notes
export async function readNotes({ accessToken }: { accessToken: string }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw Error('Error fetching notes.');

  return (await res.json()) as Note[];
}

// For reading a single note
export async function readNote({
  id,
  accessToken,
}: {
  id: number;
  accessToken: string;
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw Error('Error fetching note.');

  return (await res.json()) as Note;
}

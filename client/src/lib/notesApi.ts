import { Note } from '@/types';

async function delay() {
  await new Promise((res) => setTimeout(res, Math.random() * 1000));
}
// For creating a note
export async function createNote({ accessToken }: { accessToken: string }) {
  await delay();
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
  await delay();
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    if (res.status === 404) throw Error('This note does not exist');
    throw Error('Error fetching note.');
  }

  return (await res.json()) as Note;
}

// For updating a note
export async function updateNote({
  accessToken,
  id,
  content,
  title,
}: {
  accessToken: string;
  id: number;
  content: string;
  title: string;
}) {
  await delay();
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw Error('Error updating note.');

  return (await res.json()) as Note;
}

// For deleting a note
export async function deleteNote({
  accessToken,
  id,
}: {
  accessToken: string;
  id: number;
}) {
  await delay();
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw Error('Error deleting note.');

  return (await res.json()) as { id: number };
}

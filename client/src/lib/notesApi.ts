export async function createNote({
  accessToken,
}: {
  accessToken: string | null;
}) {
  if (!accessToken) return;

  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('Error creating note.');
  }

  return (await res.json()) as { id: number };
}

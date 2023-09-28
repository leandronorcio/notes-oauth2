export interface User {
  id: number;
  name: string;
  email?: string | null;
  avatar?: string | null;
}

export interface Note {
  id: number;
  title?: string | null;
  content?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  userId: number;
}

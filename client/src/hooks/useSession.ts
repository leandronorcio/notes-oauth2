import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';

export function useSession() {
  const { session } = useContext(AuthContext);
  return session;
}

import { AuthContext } from '@/contexts/auth-provider';
import { useContext } from 'react';

export function useSession() {
  const { session, setSession } = useContext(AuthContext);

  const logout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh/logout`,
      {
        credentials: 'include',
      }
    );

    if (!res.ok) return alert('Error logging out');

    setSession({
      accessToken: null,
      user: null,
      status: 'unauthenticated',
    });
  };

  return { ...session, logout };
}

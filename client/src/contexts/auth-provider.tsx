import { User } from '@/types';
import { createContext, useEffect, useState } from 'react';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';
interface Session {
  status: SessionStatus;
  accessToken: string | null;
  user: User | null;
}

const sessionDefaultValue: Session = {
  status: 'loading',
  accessToken: null,
  user: null,
};

export const AuthContext = createContext<{
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}>({ session: sessionDefaultValue, setSession: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(sessionDefaultValue);

  // Request an access token, if the `refreshToken` HttpOnly cookie is set,
  // we'll receive an access token and the user's info
  const refreshSession = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // This is needed to include cookies in the POST request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      setSession({ status: 'unauthenticated', accessToken: null, user: null });
      return;
    }

    const data = await res.json();
    setSession({ ...data, status: 'authenticated' });
  };

  useEffect(() => {
    if (session.accessToken || session.user) return;
    refreshSession();

    const interval = setInterval(refreshSession, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

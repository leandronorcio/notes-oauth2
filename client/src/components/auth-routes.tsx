import { useSession } from '@/hooks/useSession';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthRoutes() {
  const { status } = useSession();

  return status === 'loading' || status === 'unauthenticated' ? (
    <Outlet />
  ) : (
    <Navigate to="/notes" />
  );
}

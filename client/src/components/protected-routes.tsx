import { useSession } from '@/hooks/useSession';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoutes() {
  const { status } = useSession();

  return status === 'loading' || status === 'authenticated' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

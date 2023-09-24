import { LoginForm } from '@/components/LoginForm';

export function Register() {
  return (
    <div className="container flex items-center justify-center h-screen">
      <LoginForm type="register" />
    </div>
  );
}

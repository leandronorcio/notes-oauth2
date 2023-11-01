import { LoginForm } from '@/components/login-form';

export function Register() {
  return (
    <div className="container flex items-center justify-center h-screen">
      <LoginForm type="register" />
    </div>
  );
}

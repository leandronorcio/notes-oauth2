import { LoginForm } from '@/components/login-form';
import { Helmet } from 'react-helmet-async';

export function Login() {
  return (
    <>
      <Helmet>
        <title>Login - Notes OAuth 2.0</title>
      </Helmet>
      <div className="container flex items-center justify-center h-screen">
        <LoginForm />
      </div>
    </>
  );
}

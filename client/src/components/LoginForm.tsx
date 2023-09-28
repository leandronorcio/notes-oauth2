import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Facebook, Github, Google } from './ui/svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'login' | 'register';
}

export function LoginForm({
  className,
  type = 'login',
  ...props
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const login = (url: string) => {
    setIsLoading(true);
    window.location.href = url;
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-stretch w-full sm:w-[350px]  text-center',
        className
      )}
      {...props}
    >
      <h1 className="text-2xl font-semibold tracking-tight">
        {type === 'login' ? 'Log In to Notes' : 'Create an account'}
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        {type === 'login' ? 'Sign in' : 'Register'} using your social media
        accounts
      </p>
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex gap-2"
        onClick={() => login(import.meta.env.VITE_GITHUB_AUTH)}
        disabled={isLoading}
      >
        <Github />
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => login(import.meta.env.VITE_GOOGLE_AUTH)}
        className="flex gap-2"
      >
        <Google /> Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => login(import.meta.env.VITE_FACEBOOK_AUTH)}
        className="flex gap-2"
      >
        <Facebook />
        Facebook
      </Button>

      {isLoading && (
        <div className="flex mt-2 gap-4 text-muted-foreground justify-center">
          <Loader2 className="animate-spin" />
          Loading, please wait
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground underline underline-offset-4 mt-3">
        <Link to={type === 'login' ? '/register' : '/login'}>
          {type === 'login'
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Log In'}
        </Link>
      </p>
    </div>
  );
}

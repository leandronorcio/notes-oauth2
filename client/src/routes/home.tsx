import { LogoWithText } from '@/components/logo-with-text';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Index } from './note-index';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="px-3 py-2 flex justify-between">
        <div className="flex items-center gap-4">
          <LogoWithText />
        </div>
        <ModeToggle />
      </nav>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div>
          <Index />
        </div>
        <div className="flex gap-3 mt-5">
          <Link to="notes" className={buttonVariants({ variant: 'default' })}>
            Get Started
          </Link>
          <a
            href="https://github.com/leandronorcio/notes-oauth2"
            className={buttonVariants({ variant: 'outline' })}
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

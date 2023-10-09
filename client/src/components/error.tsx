import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-5">
      <h1 className="text-foreground font-bold text-3xl">Whoops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p className="text-muted-foreground italic">
        {error?.message || 'No error message'}
      </p>
    </div>
  );
}

export function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-5">
      <h1 className="text-foreground font-bold text-3xl">Notes OAuth 2.0</h1>
      <p className="text-center text-muted-foreground">
        A simple note-taking app that authenticates users using OAuth 2.0's
        authorization code flow and OpenID Connect, built with React Router and
        ExpressJS.
      </p>
    </div>
  );
}

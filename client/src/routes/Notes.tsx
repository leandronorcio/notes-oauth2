import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Menu, X } from 'lucide-react';
import {
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProfileBar } from '@/components/profile-bar';
import { CreateNote } from '@/components/create-note';
import { createNote, readNotes } from '@/lib/notesApi';

export async function createNoteAction({
  accessToken,
}: {
  accessToken: string | null;
}) {
  if (!accessToken) throw Error('You are not authenticated.');
  const { id } = await createNote({ accessToken });
  return redirect(`/notes/${id}/edit`);
}

export async function notesLoader({
  accessToken,
}: {
  accessToken: string | null;
}) {
  if (!accessToken) return null;
  return await readNotes({ accessToken });
}

export function Notes() {
  const notes = useLoaderData() as Awaited<ReturnType<typeof notesLoader>>;
  // This state is only used for screens smaller than `sm`
  const [sidebarShown, setSidebarShown] = useState(false);
  const toggleSidebar = () => setSidebarShown((prev) => !prev);
  const { state } = useNavigation();

  return (
    <div className="h-screen flex flex-col">
      <nav className="px-3 py-2 flex justify-between">
        <div className="flex items-center gap-4">
          {/* Only show this button screens smaller than `sm`. */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="sm:hidden"
          >
            {sidebarShown ? <X /> : <Menu />}
          </Button>
          <h1 className="text-xl font-semibold p-0 m-0">Notes</h1>
        </div>
        <ModeToggle />
      </nav>
      <Separator />

      <div className="relative flex-1">
        <div
          className={cn(
            'absolute h-full transition-[left] duration-500 w-full sm:w-[300px] flex flex-col border-r-border border-r-[1px] bg-background',
            sidebarShown ? 'left-0' : '-left-full',
            'sm:left-0'
          )}
        >
          <div className="p-2 w-full">
            <CreateNote />
          </div>
          <Separator />
          <div className="flex-1 py-2 overflow-y-auto px-2">
            <ul className="flex flex-col gap-2">
              {notes &&
                notes.map(({ id, title }) => {
                  return (
                    <li key={id}>
                      <NavLink
                        to={`${id}`}
                        className={({ isActive }) =>
                          cn(
                            'block rounded-lg py-2 px-4 border-border hover:bg-accent border-[1px] cursor-pointer truncate',
                            isActive && 'bg-secondary'
                          )
                        }
                      >
                        {({ isPending }) => (
                          <div
                            className={cn(
                              'flex gap-2 justify-between',
                              isPending && 'opacity-70',
                              !title && 'text-muted-foreground italic'
                            )}
                          >
                            {title || 'Untitled note'}
                            {isPending && <Loader2 className="animate-spin" />}
                          </div>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
          <Separator />
          <div className="p-1">
            <ProfileBar />
          </div>
        </div>
        <div
          className={cn(
            'h-full flex-1 sm:ml-[300px]',
            state === 'loading' && 'opacity-60'
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Login } from './routes/login';
import { Register } from './routes/register';
import { Notes, createNoteAction, notesLoader } from './routes/notes';
import { NoteDetail, noteDetailLoader } from './routes/note-detail';
import { ProtectedRoutes } from './components/protected-routes';
import { AuthRoutes } from './components/auth-routes';
import { useSession } from './hooks/useSession';
import { NoteEdit, editNoteAction } from './routes/note-edit';
import { deleteNoteAction } from './routes/note-delete';
import { Index } from './routes/note-index';

export const Paths = {
  root: '/',
  notes: '/notes',
  noteDetail: '/notes/:noteId',
  noteEdit: '/notes/:noteId/edit',
  noteDelete: '/notes/:noteId/delete',
  login: '/login',
  register: '/register',
} as const;

export function Router() {
  const { accessToken } = useSession();

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: Paths.root,
        },
        {
          element: <AuthRoutes />,
          children: [
            {
              path: Paths.login,
              element: <Login />,
            },
            {
              path: Paths.register,
              element: <Register />,
            },
          ],
        },
        {
          element: <ProtectedRoutes />,
          children: [
            // The `accessToken` is guaranteed to be non-null for these routes as they are
            // wrapped in <ProtectedRoutes>, so we can safely use non-null assertion here.
            {
              path: Paths.notes,
              element: <Notes />,
              action: () => createNoteAction({ accessToken: accessToken! }),
              loader: () => notesLoader({ accessToken: accessToken! }),
              children: [
                { index: true, element: <Index /> },
                {
                  path: Paths.noteDetail,
                  loader: ({ params, request }) =>
                    noteDetailLoader({
                      accessToken: accessToken!,
                      params,
                      request,
                    }),
                  element: <NoteDetail />,
                  errorElement: <div>not found</div>,
                },
                {
                  path: Paths.noteEdit,
                  action: ({ params, request }) =>
                    editNoteAction({
                      accessToken: accessToken!,
                      params,
                      request,
                    }),
                  loader: ({ params, request }) =>
                    noteDetailLoader({
                      accessToken: accessToken!,
                      params,
                      request,
                    }),
                  element: <NoteEdit />,
                },
                {
                  path: Paths.noteDelete,
                  action: ({ params, request }) =>
                    deleteNoteAction({
                      accessToken: accessToken!,
                      params,
                      request,
                    }),
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}

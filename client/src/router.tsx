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
            {
              path: Paths.notes,
              element: <Notes />,
              action: () => createNoteAction({ accessToken }),
              loader: () => notesLoader({ accessToken }),
              children: [
                { index: true, element: <Index /> },
                {
                  path: Paths.noteDetail,
                  loader: ({ params, request }) =>
                    noteDetailLoader({ params, accessToken, request }),
                  element: <NoteDetail />,
                  errorElement: <div>not found</div>,
                },
                {
                  path: Paths.noteEdit,
                  action: ({ params, request }) =>
                    editNoteAction({ params, accessToken, request }),
                  loader: ({ params, request }) =>
                    noteDetailLoader({ params, accessToken, request }),
                  element: <NoteEdit />,
                },
                {
                  path: Paths.noteDelete,
                  action: ({ params, request }) =>
                    deleteNoteAction({ params, request, accessToken }),
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}

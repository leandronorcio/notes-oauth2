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
                {
                  path: Paths.noteDetail,
                  loader: (params) =>
                    noteDetailLoader({ ...params, accessToken }),
                  element: <NoteDetail />,
                  errorElement: <div>not found</div>,
                },
                {
                  path: Paths.noteEdit,
                  action: ({ params, request }) =>
                    editNoteAction({ params, request, accessToken }),
                  loader: (params) =>
                    noteDetailLoader({ ...params, accessToken }),
                  element: <NoteEdit />,
                },
                {
                  path: Paths.noteDelete,
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}

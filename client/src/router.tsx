import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Notes, notesLoader } from './routes/Notes';
import { NoteDetail, noteDetailLoader } from './routes/NoteDetail';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { AuthRoutes } from './components/AuthRoutes';
import { useSession } from './hooks/useSession';
import { NoteEdit } from './routes/NoteEdit';

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

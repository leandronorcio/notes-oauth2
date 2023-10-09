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
import { ErrorPage } from './components/error';
import { Home } from './routes/home';

export const Paths = {
  home: '/',
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
          path: Paths.home,
          element: <Home />,
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
                  errorElement: <ErrorPage />,
                  children: [
                    { index: true, element: <Index /> },
                    {
                      path: Paths.noteDetail,
                      loader: ({ params, request }) =>
                        noteDetailLoader({
                          accessToken,
                          params,
                          request,
                        }),
                      element: <NoteDetail />,
                    },
                    {
                      path: Paths.noteEdit,
                      action: ({ params, request }) =>
                        editNoteAction({
                          accessToken,
                          params,
                          request,
                        }),
                      loader: ({ params, request }) =>
                        noteDetailLoader({
                          accessToken,
                          params,
                          request,
                        }),
                      element: <NoteEdit />,
                    },
                    {
                      path: Paths.noteDelete,
                      action: ({ params, request }) =>
                        deleteNoteAction({
                          accessToken,
                          params,
                          request,
                        }),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}

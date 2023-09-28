import { createBrowserRouter } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Notes } from './routes/Notes';
import { NoteDetail } from './routes/NoteDetail';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { AuthRoutes } from './components/AuthRoutes';

const Paths = {
  root: '/',
  notes: '/notes',
  noteDetail: '/notes/:noteId',
  noteEdit: '/notes/:noteId/edit',
  noteDelete: '/notes/:noteId/delete',
  login: '/login',
  register: '/register',
};

export const router = createBrowserRouter([
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
        children: [
          {
            path: Paths.noteDetail,
            element: <NoteDetail />,
          },
          {
            path: Paths.noteEdit,
          },
          {
            path: Paths.noteDelete,
          },
        ],
      },
    ],
  },
]);

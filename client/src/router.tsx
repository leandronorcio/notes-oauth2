import { createBrowserRouter } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Notes } from './routes/Notes';

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
    path: Paths.notes,
    element: <Notes />,
    children: [
      {
        path: Paths.noteDetail,
      },
      {
        path: Paths.noteEdit,
      },
      {
        path: Paths.noteDelete,
      },
    ],
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
]);

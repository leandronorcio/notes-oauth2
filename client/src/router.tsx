import { createBrowserRouter } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';

const Paths = {
  root: '/',
  noteDetail: '/note/:noteId',
  noteEdit: '/note/:noteId/edit',
  noteDelete: '/note/:noteId/delete',
  login: '/login',
  register: '/register',
};

export const router = createBrowserRouter([
  {
    path: Paths.root,
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

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from './components/ui/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/auth-provider';
import { Router } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

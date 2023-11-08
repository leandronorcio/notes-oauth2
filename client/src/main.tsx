import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/auth-provider';
import { Router } from './router';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <HelmetProvider>
          <Helmet>
            <title>Notes - OAuth 2.0</title>
          </Helmet>
          <Router />
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

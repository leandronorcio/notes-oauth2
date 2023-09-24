import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { Button } from './components/ui/button';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>Sanity</div>
    <Button>Action</Button>
  </React.StrictMode>
);

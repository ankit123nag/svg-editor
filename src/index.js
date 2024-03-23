import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import Theatre from './components/Controls/Theatre';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Theatre />
  </React.StrictMode>
);

import React from 'react';
import { createRoot } from 'react-dom/client';
import PopupApp from './PopupApp'
// Consider adding a base CSS file for the popup if needed
// import './popup.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Could not find root element to mount popup");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);

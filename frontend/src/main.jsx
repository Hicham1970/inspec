// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import App from './app';
import i18n from './i18n';
import './index.css';            // Import de Tailwind

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </I18nextProvider>
  </React.StrictMode>
);

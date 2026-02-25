/* src/index.jsx */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import i18n from './i18n';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element!');

createRoot(container).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />   {/* this contains <Navbar />, <AppRouter />, <Footer /> */}
        </BrowserRouter>
      </HelmetProvider>
    </I18nextProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './components/assets/css/styleguide.css'; // Importing the CSS file
import './components/assets/css/components.css'; // Importing the CSS file
import './components/assets/css/style.css'; // Importing the CSS file
import './components/assets/css/normalize.css'; // Importing the CSS file
import './components/assets/css/tailwind.css'; // Importing the CSS file

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

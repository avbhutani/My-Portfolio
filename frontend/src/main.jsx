import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Loaded first so global primitives (.btn, .card, .section) are emitted before
// component CSS modules and lose equal-specificity ties predictably.
import './styles/tokens.css';
import './styles/global.css';

// react-toastify ships no runtime style injection, so its base CSS is required
// for toasts to be positioned at all. Must precede our overrides.
import 'react-toastify/ReactToastify.css';
import './styles/toast.css';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
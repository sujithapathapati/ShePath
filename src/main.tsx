import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './contexts/AppContext';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider> {/* ✅ Wrap with AppProvider */}
      <App />
    </AppProvider>
    
  </StrictMode>
);

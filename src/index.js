import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { DataProvider } from './components';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('root element not found!');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>
);

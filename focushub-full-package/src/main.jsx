import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error boundary to catch crashes
try {
  const root = document.getElementById('root');
  if (!root) {
    document.body.innerHTML = '<div style="color: white; padding: 20px;">Error: Root element not found</div>';
  } else {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
} catch (error) {
  console.error('Failed to mount React app:', error);
  document.body.innerHTML = '<div style="color: white; padding: 20px;">Error loading app: ' + error.message + '</div>';
}

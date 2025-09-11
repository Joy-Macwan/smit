import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Import UI effects
import './utils/ui-effects'
import { initializeAllSidebarEffects } from './utils/sidebar-effects'

// Initialize sidebar effects after the app is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAllSidebarEffects();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

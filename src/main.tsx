import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Admin } from './admin/Admin.tsx'
import { TrackingProvider } from './hooks/useTracking'

const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <Admin /> : <TrackingProvider><App /></TrackingProvider>}
  </StrictMode>,
)

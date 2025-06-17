import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServerContext from './context/ServerContext.jsx'
createRoot(document.getElementById('root')).render(
  <ServerContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServerContext>

)

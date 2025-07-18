import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServerContext from './context/ServerContext.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ServerContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServerContext>
  </Provider>
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ImageProvider } from './context/ImageContext.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // We replaced StrictMode with BrowserRouter to enable React Router.
  <BrowserRouter>
    <ImageProvider>
      <App />
    </ImageProvider>
  </BrowserRouter>,
)

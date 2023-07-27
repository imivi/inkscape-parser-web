import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'
import { LocaleContextProvider } from './context/localeContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleContextProvider>
      <App />
    </LocaleContextProvider>
  </React.StrictMode>,
)

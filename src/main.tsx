import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const target = document.getElementById('root')
if (target == null) throw new Error()

ReactDOM.createRoot(target).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

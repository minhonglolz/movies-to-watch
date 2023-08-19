import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './styles/theme/theme.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  }
])

const target = document.getElementById('root')
if (target == null) throw new Error()

ReactDOM.createRoot(target).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </React.StrictMode>
)

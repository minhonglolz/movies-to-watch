import React from 'react'
import ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './styles/theme/theme.ts'
import { Routes } from './components/Routes.tsx'

const target = document.getElementById('root')
if (target == null) throw new Error()

ReactDOM.createRoot(target).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Routes />
  </React.StrictMode>
)

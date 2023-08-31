import React from 'react'
import ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './styles/theme/theme.ts'
import { Routes } from './components/Routes.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'

const target = document.getElementById('root')
if (target == null) throw new Error()

ReactDOM.createRoot(target).render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Routes />
    </Provider>
  </React.StrictMode>
)

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme/theme'
import { Layout } from './components/Layout/Layout'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  )
}

export default App

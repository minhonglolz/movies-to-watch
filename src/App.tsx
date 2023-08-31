import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme/theme'
import { Layout } from './components/Layout/Layout'
import { useFirebaseWatchList } from './hooks/useFirebaseWatchList'

function App () {
  useFirebaseWatchList()
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  )
}

export default App

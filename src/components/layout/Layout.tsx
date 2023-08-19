import { Box } from '@chakra-ui/react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export function Layout () {
  return (
    <Box transition="0.5s ease-out" minHeight="100vh">
      <Box margin="0 auto" maxWidth={1000}>
        <Header />
        <Box as="main" marginY={22}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

import { Box } from '@chakra-ui/react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

export function Layout () {
  return (
    <Box transition="0.5s ease-out" minHeight="100vh">
      <Box margin="0 auto" maxWidth={1200}>
        <Header />
        <Box as="main" marginY={16}><Outlet /></Box>
        <Footer/>
      </Box>
    </Box>
  )
}

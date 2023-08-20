import { Box } from '@chakra-ui/react'
import { TheHeader } from './TheHeader'
import { Outlet } from 'react-router-dom'
import { TheFooter } from './TheFooter'

export function Layout () {
  return (
    <Box transition="0.5s ease-out" minHeight="100vh">
      <Box margin="0 auto" maxWidth={1200}>
        <TheHeader />
        <Box as="main" marginY={16}><Outlet /></Box>
        <TheFooter/>
      </Box>
    </Box>
  )
}

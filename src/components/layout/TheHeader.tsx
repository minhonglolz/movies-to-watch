import { Button, Flex } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Link } from 'react-router-dom'

export function TheHeader () {
  return (
    <Flex p={4} justifyContent='space-between' alignItems='center' gap={4}>
      <Button mr='auto' fontSize='xl' fontWeight='600' variant='unstyled'>
        <Link to='/'>Movies</Link>
      </Button>
      <Button variant='unstyled'>
        <Link to='/watch-list'>
          待看清單
        </Link>
      </Button>
      <ThemeToggle/>
    </Flex>
  )
}

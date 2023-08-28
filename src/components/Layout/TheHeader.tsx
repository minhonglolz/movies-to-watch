import { Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'

export function TheHeader () {
  const navigate = useNavigate()
  return (
    <Box p={4} pt={8} w='full' position={'relative'}>
      <Flex justifyContent='space-between' alignItems='center' gap={4}>
        <Button mr='auto' fontSize='xl' fontWeight='800' variant='unstyled'>
          <Link to='/'>Movies</Link>
        </Button>
        <Button variant='unstyled'>
          <Link to='/watch-list'>
            待看清單
          </Link>
        </Button>
        <IconButton
          onClick={() => { navigate('/search') }}
          variant={'unstyled'}
          icon={<SearchIcon />}
          aria-label={'search'}
          background='none'
        />
        <ThemeToggle />
      </Flex>
    </Box>

  )
}

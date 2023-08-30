import { Avatar, Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { useAuthState } from '../../hooks/useAuthState'
import { ButtonGoogleLogin } from '../../firebase/ButtonGoogleLogin'
import { GoSignOut } from 'react-icons/go'

export function TheHeader () {
  const navigate = useNavigate()
  const { googleAuth, signOut, isLoaded } = useAuthState()

  return (
    <Box p={4} pt={8} w='full' position={'relative'}>
      <Flex justifyContent='space-between' alignItems='center' gap={4}>
        <Button mr='auto' fontSize='4xl' fontWeight='800' variant='unstyled' display={'flex'}>
          <Link to='/'>🍿️</Link>
        </Button>
        <Button variant='unstyled'>
          <Link to='/watch-list'>
            待看清單
          </Link>
        </Button>
        {isLoaded &&
        (googleAuth
          ? <Menu>
            <MenuButton
              as={Avatar}
              aria-label='user'
              size={'sm'}
              name={googleAuth.name ?? 'U'}
              src={googleAuth.photoURL ?? undefined}
            />
            <MenuList>
              <MenuItem onClick={signOut} icon={<GoSignOut />}>
                登出
              </MenuItem>
            </MenuList>
          </Menu>
          : <ButtonGoogleLogin />)}
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

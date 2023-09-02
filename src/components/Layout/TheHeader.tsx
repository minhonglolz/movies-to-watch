import { Avatar, Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Image } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { useAuthState } from '../../hooks/useAuthState'
import { ButtonGoogleLogin } from '../ButtonGoogleLogin'
import { GoSignOut } from 'react-icons/go'
import { useToast } from '../../hooks/useToast'
import PopcornIcon from '../../assets/popcorn.png'

export function TheHeader () {
  const navigate = useNavigate()
  const { googleAuth, signOut, isLoaded } = useAuthState()
  const { showErrorToast } = useToast()

  const handleClickWatchListButton = () => {
    if (!googleAuth) {
      showErrorToast('欲查看待看清單，請先登入')
      return
    }
    navigate('/watch-list')
  }
  return (
    <Box p={4} pt={8} w='full' position="relative">
      <Flex justifyContent='space-between' alignItems='center' gap={4}>
        <Button mr='auto' fontSize='4xl' fontWeight='800' variant='unstyled' display="flex">
          <Link to='/'><Image src={PopcornIcon} boxSize="40px" /></Link>
        </Button>
        <Button variant='unstyled' onClick={handleClickWatchListButton}>
          待看清單
        </Button>
        {isLoaded &&
        (googleAuth
          ? <Menu>
            <MenuButton
              as={Avatar}
              aria-label='user'
              size="sm"
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
        <ThemeToggle />
        <IconButton
          display="inline-flex"
          onClick={() => { navigate('/search') }}
          variant="unstyled"
          icon={<SearchIcon />}
          aria-label="search"
          background='none'
        />
      </Flex>
    </Box>

  )
}

import { Avatar, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Image, Text } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Link } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { useAuthState } from '../../hooks/useAuthState'
import { ButtonGoogleLogin } from '../ButtonGoogleLogin'
import { GoSignOut } from 'react-icons/go'
import PopcornIcon from '../../assets/popcorn.png'

export function TheHeader () {
  const { googleAuth, signOut, isLoaded } = useAuthState()

  return (
    <Flex as='nav' p={4} pt={8} w='full' position="relative" justifyContent='space-between' alignItems='center' gap={4}>
      <Button mr='auto' fontSize='4xl' fontWeight='800' variant='unstyled' display="flex">
        <Link to='/'><Image src={PopcornIcon} boxSize="40px" /></Link>
      </Button>
      <Text as={Link} fontWeight={600} to='/watch-list'>待看清單</Text>
      {isLoaded &&
        (googleAuth
          ? <Menu>
            <MenuButton as={Button} aria-label='user' variant="unstyled">
              <Avatar size="sm" name={googleAuth.name ?? 'U'} src={googleAuth.photoURL ?? undefined} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={signOut} icon={<GoSignOut />}>
                登出
              </MenuItem>
            </MenuList>
          </Menu>
          : <ButtonGoogleLogin />)}
      <ThemeToggle />
      <IconButton
        as={Link}
        to="/search"
        display="inline-flex"
        variant="unstyled"
        icon={<SearchIcon />}
        aria-label="search"
        background='none'
      />
    </Flex>

  )
}

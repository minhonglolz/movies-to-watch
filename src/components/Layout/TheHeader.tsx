import { Box, Button, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useDisclosure, Kbd } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Link } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { AiOutlineEnter } from 'react-icons/ai'

export function TheHeader () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')
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
          onClick={isOpen ? onClose : onOpen}
          variant={'unstyled'}
          icon={<SearchIcon />}
          aria-label={'search'}
        />
        <ThemeToggle />
      </Flex>
      {isOpen &&
        <InputGroup mt={4} h={'30px'} w='full'>
          <InputLeftElement
            pl={4}
            pointerEvents="none"
            children={<SearchIcon className="SearchIcon" color="gray.300" />}
          />
          <Input
            borderRadius={'30px'}
            placeholder='搜尋電影'
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                return null
              }
            }}
          />
          <InputRightElement
            pr={4}
            pointerEvents="none"
            children={<Kbd><AiOutlineEnter /></Kbd>}
          />
        </InputGroup>
      }
    </Box>

  )
}

import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input, InputRightElement, Kbd } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineEnter } from 'react-icons/ai'

export function Search () {
  const [searchInput, setSearchInput] = useState('')

  return (
    <>
      <InputGroup h={'40px'} w='full'>
        <InputLeftElement
          pl={4}
          pointerEvents="none"
          children={<SearchIcon className="SearchIcon" color="gray.300" />}
        />
        <Input
          h={'40px'}
          borderRadius={'40px'}
          placeholder='搜尋電影'
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value) }}
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
    </>
  )
}

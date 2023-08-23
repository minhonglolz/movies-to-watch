import { Flex, Text, Spacer, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, HStack, Box, useMediaQuery } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useState } from 'react'
import { TextFieldLabel } from '../TextFieldLabel'
import { DRAWER_MOVIES_SORT_BY_OPTIONS, MOVIES_INIT_FILTER } from '../../constants/movies'
import { type sortByOptionsType, type DiscoverMovieParams } from '../../types/Discoverd/Movie'

interface Filter {
  sort_by: sortByOptionsType[number]
  'release_date.gte'?: DiscoverMovieParams['release_date.gte']
  'release_date.lte'?: DiscoverMovieParams['release_date.lte']
}

interface Props {
  isOpen: boolean
  filter: DiscoverMovieParams
  onClose: () => void
  onSubmit: (filter: DiscoverMovieParams) => void
}

export function DrawerMoviesFilter ({ isOpen, onClose, filter, onSubmit }: Props) {
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const [moviesFilter, setMoviesFilter] = useState<Filter>({
    ...filter,
    sort_by: DRAWER_MOVIES_SORT_BY_OPTIONS.find((option) => option.value === filter.sort_by) ?? DRAWER_MOVIES_SORT_BY_OPTIONS[0]
  })

  const handleReset = () => {
    setMoviesFilter({
      ...MOVIES_INIT_FILTER,
      sort_by: DRAWER_MOVIES_SORT_BY_OPTIONS[0]
    })
  }

  const handleSubmit = () => {
    onSubmit({
      ...moviesFilter,
      sort_by: moviesFilter.sort_by.value
    })
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size={isLargerThanLg ? 'sm' : 'full'}
      >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display={'flex'} alignItems={'center'} >
          <Text>搜尋</Text>
          <Spacer/>
          <Button variant='outline' onClick={handleReset}>重置</Button>
        </DrawerHeader>

        <DrawerBody py={5} as={Flex} flexDirection={'column'} gap={6}>
          <Box gap={2}>
            <TextFieldLabel value='排序結果依據' />
            <Select
              options={DRAWER_MOVIES_SORT_BY_OPTIONS}
              onChange={(newValue) => {
                if (newValue != null) {
                  setMoviesFilter({
                    ...filter,
                    sort_by: newValue
                  })
                }
              }}
              value={moviesFilter.sort_by}
             />
          </Box>
          <Box>
            <TextFieldLabel value='發布日期' />
            <HStack mb={2}>
              <Text fontWeight={'600'}>從</Text>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                value={moviesFilter['release_date.gte']}
                onChange={(e) => {
                  setMoviesFilter({ ...moviesFilter, 'release_date.gte': e.target.value })
                }}
              />
            </HStack>
            <HStack>
              <Text fontWeight={'600'}>至</Text>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                value={moviesFilter['release_date.lte']}
                onChange={(e) => {
                  setMoviesFilter({ ...moviesFilter, 'release_date.lte': e.target.value })
                }}
              />
            </HStack>
          </Box>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} colorScheme='blue'>
            送出
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

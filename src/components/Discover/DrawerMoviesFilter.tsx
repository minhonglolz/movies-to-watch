import { Flex, Text, Spacer, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, HStack, Box, useMediaQuery, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, RangeSliderMark, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SliderMark } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useState } from 'react'
import { TextFieldLabel } from '../TextFieldLabel'
import { DRAWER_MOVIES_SORT_BY_OPTIONS, MOVIES_INIT_FILTER } from '../../constants/movies'
import { type sortByOptionsType, type DiscoverMovieParams } from '../../types/Discoverd/Movies'

const rangeSliderMarkStyle = {
  textAlign: 'center',
  mt: '-9',
  ml: '-6',
  w: '12'
} as const

interface Filter {
  sort_by: sortByOptionsType[number]
  'release_date.gte'?: DiscoverMovieParams['release_date.gte']
  'release_date.lte'?: DiscoverMovieParams['release_date.lte']
  'vote_average.gte': DiscoverMovieParams['vote_average.gte']
  'vote_average.lte': DiscoverMovieParams['vote_average.lte']
  'vote_count.gte': DiscoverMovieParams['vote_count.gte']
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

  const handleCancel = () => {
    setMoviesFilter({
      ...filter,
      sort_by: DRAWER_MOVIES_SORT_BY_OPTIONS.find((option) => option.value === filter.sort_by) ?? DRAWER_MOVIES_SORT_BY_OPTIONS[0]
    })
    onClose()
  }

  const handleSubmit = () => {
    onSubmit({
      ...moviesFilter,
      page: 1,
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
      <DrawerContent my={4}>
        <DrawerHeader display={'flex'} alignItems={'center'}>
          <Text>搜尋</Text>
          <Spacer />
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
          <Flex flexDirection={'column'}>
            <TextFieldLabel value='評分' mb={8} />
            <RangeSlider
              w={'98%'}
              alignSelf={'flex-end'}
              min={1}
              max={10}
              value={[moviesFilter['vote_average.gte'], moviesFilter['vote_average.lte']]}
              onChange={(newValue) => {
                const [gte, lte] = newValue
                setMoviesFilter({
                  ...moviesFilter,
                  'vote_average.gte': gte,
                  'vote_average.lte': lte
                })
              }}
            >
              <RangeSliderMark
                value={moviesFilter['vote_average.gte']}
                {...rangeSliderMarkStyle}
              >
                {moviesFilter['vote_average.gte']}
              </RangeSliderMark>
              <RangeSliderMark
                value={moviesFilter['vote_average.lte']}
                {...rangeSliderMarkStyle}
              >
                {moviesFilter['vote_average.lte']}
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} zIndex={0} />
              <RangeSliderThumb index={1} zIndex={0} />
            </RangeSlider>
          </Flex>
          <Flex flexDirection={'column'} mb={'12'}>
            <TextFieldLabel value='最低評分數' mb={8} />
            <Slider
              alignSelf={'flex-end'}
              value={moviesFilter['vote_count.gte']}
              min={0}
              max={5}
              w={'98.1%'}
              onChange={(newValue) => {
                setMoviesFilter({
                  ...moviesFilter,
                  'vote_count.gte': newValue
                })
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderMark value={moviesFilter['vote_count.gte']} mt='-9' ml={'-20px'} w='10' textAlign={'center'}>
                {moviesFilter['vote_count.gte'] * 100}
              </SliderMark>
              <SliderMark value={0} mt='3' ml='-5px'>
                0
              </SliderMark>
              {new Array(5).fill('').map((_, index) =>
                <SliderMark key={index} value={index + 1} mt='3' ml='-14px'>
                  {(index + 1) * 100}
                </SliderMark>)}
              <SliderThumb zIndex={0} />
            </Slider>
          </Flex>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={handleCancel}>
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

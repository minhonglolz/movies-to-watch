import { Flex, Grid, GridItem, Heading, Image, Text, VStack, useTheme, Spacer, IconButton, useMediaQuery, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, Input, HStack, Box } from '@chakra-ui/react'
import useSWR from 'swr'
import { tmdbSWRFetcher } from '../../utils/swrFetcher'
import { getURLWithParams } from '../../utils/urlParams'
import { useMemo, useState } from 'react'
import { traditionalized } from '../../utils/traditionalized'
import { type SortByUnion, type DiscoverMovieParams, type MovieResponse } from '../../types/Discoverd/Movie'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Select } from 'chakra-react-select'
import noImage from '../../assets/noImage.svg'

const POSTER_IMAGE_URL_X1 = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
const POSTER_IMAGE_URL_X2 = 'https://www.themoviedb.org/t/p/w440_and_h660_face/'

const sortByOptions: Array<{ label: string, value: SortByUnion }> = [
  { label: '按人氣降序', value: 'popularity.desc' },
  { label: '按人氣升序', value: 'popularity.asc' },
  { label: '按評分降序', value: 'vote_average.desc' },
  { label: '按評分升序', value: 'vote_average.asc' },
  { label: '按上評分數降序', value: 'vote_count.desc' },
  { label: '按上評分數升序', value: 'vote_count.asc' },
  { label: '按上映日期降序', value: 'primary_release_date.desc' },
  { label: '按上映日期升序', value: 'primary_release_date.asc' }
]

export function Home () {
  const theme = useTheme()

  const [sortBy, setSortBy] = useState(sortByOptions[0])
  const [filter, setFilter] = useState<DiscoverMovieParams>({
    sort_by: sortBy.value,
    page: 1,
    language: 'zh-tw',
    include_adult: 'false',
    include_video: 'false'
  })

  const key = useMemo(() => {
    const params: DiscoverMovieParams = filter
    return getURLWithParams('https://api.themoviedb.org/3/discover/movie', params)
  }, [filter])

  const { data } = useSWR<MovieResponse>(key, tmdbSWRFetcher, { focusThrottleInterval: 500000 })

  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmitFilter = () => {
    setFilter({
      sort_by: sortBy.value
    })
    onClose()
  }

  return (
    <Flex flexDirection={'column'}>
      <Flex mb={4}>
        <Heading fontSize={'xl'}>時下熱門</Heading>
        <Spacer />
        <IconButton
          onClick={onOpen}
          variant={'ghost'}
          aria-label='Filter database'
          icon={<HamburgerIcon />} />
      </Flex>

      <Grid gap={6} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}>
        {data?.results.map((movie) => {
          return (
            <GridItem
              key={movie.id}
              borderRadius={12}
              w='100%'
              border={`.5px solid ${theme.colors.gray[500]}`}
              shadow={'2xl'}
            >
              {movie.poster_path != null
                ? <Image
                    borderTopRadius={12}
                    src={`${isLargerThanLg ? POSTER_IMAGE_URL_X2 : POSTER_IMAGE_URL_X1}${movie.poster_path}`}
              />
                : <Image
                    borderTopRadius={12}
                    src={noImage}
             />
              }

              <VStack p={2} alignItems={'start'} gap={1}>
                <Text fontWeight={600} fontSize={['sm', 'sm', 'md']}>{traditionalized(movie.title)}</Text>
                <Text fontSize='xs'>平均分數：{(movie.vote_average)}</Text>
              </VStack>
            </GridItem>
          )
        })}
      </Grid>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={isLargerThanLg ? 'sm' : 'full'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' display={'flex'} alignItems={'center'} >
            <Text>搜尋</Text>
            <Spacer/>
            <Button variant='outline'>
              重置
            </Button>
          </DrawerHeader>

          <DrawerBody as={Flex} flexDirection={'column'} gap={6}>
            <Box>
              <Text>排序結果依據</Text>
              <Select
                options={sortByOptions}
                onChange={(newValue) => {
                  if (newValue != null) {
                    setSortBy(newValue)
                  }
                }}
                value={sortBy}
             />
            </Box>
            <Box>
              <Text>發布日期</Text>
              <HStack>
                <Text>從</Text>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
              />
              </HStack>
              <HStack>
                <Text>至</Text>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
              />
              </HStack>
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              取消
            </Button>
            <Button onClick={onSubmitFilter} colorScheme='blue'>
              送出
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

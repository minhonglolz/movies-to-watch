import { Flex, Grid, GridItem, Heading, Text, VStack, useTheme, Spacer, IconButton, useDisclosure, useColorModeValue } from '@chakra-ui/react'
import useSWR from 'swr'
import { tmdbSWRFetcher } from '../../utils/swrFetcher'
import { getURLWithParams } from '../../utils/urlParams'
import { useMemo, useState } from 'react'
import { traditionalized } from '../../utils/traditionalized'
import { type DiscoverMovieParams, type MovieResponse } from '../../types/Discoverd/Movies'
import { BiFilterAlt } from 'react-icons/bi'
import { DrawerMoviesFilter } from './DrawerMoviesFilter'
import { MOVIES_INIT_FILTER } from '../../constants/movies'
import { Poster } from './Poster'

export function Movies () {
  const theme = useTheme()

  const [filter, setFilter] = useState<DiscoverMovieParams>(MOVIES_INIT_FILTER)

  const key = useMemo(() => {
    const params: DiscoverMovieParams = {
      ...filter,
      'vote_count.gte': filter['vote_count.gte'] * 100
    }
    return getURLWithParams('https://api.themoviedb.org/3/discover/movie', params)
  }, [filter])

  const { data } = useSWR<MovieResponse>(key, tmdbSWRFetcher, { focusThrottleInterval: 500000 })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmitFilter = (filter: DiscoverMovieParams) => {
    setFilter(filter)
    onClose()
  }
  const cardBorderColor = useColorModeValue(theme.colors.gray[50], theme.colors.gray[500])

  return (
    <Flex flexDirection={'column'}>
      <Flex mb={4}>
        <Heading fontSize={'xl'}>時下熱門</Heading>
        <Spacer />
        <IconButton
          onClick={onOpen}
          variant={'ghost'}
          aria-label='Filter database'
          icon={<BiFilterAlt />} />
      </Flex>
      <Grid gap={6} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}>
        {data?.results.map((movie) => {
          return (
            <GridItem
              key={movie.id}
              borderRadius={12}
              border={`.5px solid ${cardBorderColor}`}
              shadow={'2xl'}
              height={'100%'}
              display={'flex'}
              flexDirection={'column'}
            >
              <Poster posterUrl={movie.poster_path} id={movie.id} />
              <VStack p={2} alignItems={'start'} gap={1}>
                <Text fontWeight={600} fontSize={['sm', 'sm', 'md']}>{traditionalized(movie.title)}</Text>
                <Text fontSize='xs'>平均分數：{(movie.vote_average)}</Text>
              </VStack>
            </GridItem>
          )
        })}
      </Grid>
      <DrawerMoviesFilter
        filter={filter}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitFilter}
      />
    </Flex>
  )
}

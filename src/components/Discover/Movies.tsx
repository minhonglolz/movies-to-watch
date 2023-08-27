import { Flex, GridItem, Heading, Text, VStack, useTheme, Spacer, IconButton, useDisclosure, useColorModeValue, SimpleGrid } from '@chakra-ui/react'
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
import { useNavigate } from 'react-router-dom'

export function Movies () {
  const theme = useTheme()
  const navigate = useNavigate()

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
          icon={<BiFilterAlt />}
        />
      </Flex>
      <SimpleGrid gap={6} columns={[2, 4, 5]}>
        {data?.results.map((movie) => {
          return (
            <GridItem
              key={movie.id}
              borderRadius={12}
              border={`.5px solid ${cardBorderColor}`}
              shadow={'2xl'}
              display={'flex'}
              flexDirection={'column'}
            >
              <Poster posterUrl={movie.poster_path} id={movie.id} />
              <VStack p={2} alignItems={'start'} gap={1}>
                <Text
                  onClick={() => {
                    navigate(`/movie/${movie.id}`)
                  }}
                  cursor={'pointer'}
                  fontWeight={600}
                  fontSize={['sm', 'sm', 'md']}
                  transition={'opacity .3s'}
                  _hover={{
                    opacity: 0.6
                  }}
                >
                  {traditionalized(movie.title)}
                </Text>
                <Text fontSize='xs'>平均分數：{(movie.vote_average)}</Text>
              </VStack>
            </GridItem>
          )
        })}
      </SimpleGrid>
      <DrawerMoviesFilter
        filter={filter}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitFilter}
      />
    </Flex>
  )
}

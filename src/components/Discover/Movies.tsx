import { Flex, IconButton, useDisclosure, SimpleGrid } from '@chakra-ui/react'
import useSWR from 'swr'
import { tmdbSWRFetcher } from '../../utils/swrFetcher'
import { getURLWithParams } from '../../utils/urlParams'
import { useMemo, useState } from 'react'
import { type DiscoverMovieParams, type MovieResponse } from '../../types/Discoverd/Movies'
import { BiFilterAlt } from 'react-icons/bi'
import { DrawerMoviesFilter } from './DrawerMoviesFilter'
import { MOVIES_INIT_FILTER } from '../../constants/movies'
import { CardMovie } from '../CardMovie'
import { PageTitle } from '../PageTitle'

export function Movies () {
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

  return (
    <Flex flexDirection={'column'}>
      <Flex mb={4} alignItems={'center'} justifyContent={'space-between'}>
        <PageTitle>時下熱門</PageTitle>
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
            <CardMovie
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              popularity={movie.popularity}
              releaseDate={movie.release_date}
              voteCount={movie.vote_count}
            />
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

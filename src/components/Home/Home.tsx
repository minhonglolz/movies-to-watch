import { Flex, Grid, GridItem, Heading, Image, useBreakpoint, Text, VStack, useTheme } from '@chakra-ui/react'
import useSWR from 'swr'
import { tmdbSWRFetcher } from '../../utils/swrFetcher'
import { getURLWithParams } from '../../utils/urlParams'
import { useMemo } from 'react'
import { traditionalized } from '../../utils/traditionalized'
import { type MovieResponse } from '../../types/Discoverd/Movie'
import { type Breakpoints } from '../../types/Breakpoint'

const POSTER_IMAGE_URL_X1 = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
const POSTER_IMAGE_URL_X2 = 'https://www.themoviedb.org/t/p/w440_and_h660_face/'

const posterImageUrl: Record<Breakpoints, string> = {
  base: POSTER_IMAGE_URL_X1,
  sm: POSTER_IMAGE_URL_X1,
  md: POSTER_IMAGE_URL_X1,
  lg: POSTER_IMAGE_URL_X2,
  xl: POSTER_IMAGE_URL_X2,
  '2xl': POSTER_IMAGE_URL_X2
}

export function Home () {
  const theme = useTheme()

  const key = useMemo(() => {
    const params = {
      include_adult: 'false',
      include_video: 'false',
      language: 'zh-tw',
      page: '1',
      sort_by: 'popularity.desc'
    }
    return getURLWithParams('https://api.themoviedb.org/3/discover/movie', params)
  }, [])

  const { data, error, isLoading, isValidating } = useSWR<MovieResponse>(key, tmdbSWRFetcher)

  const breakpoint = useBreakpoint()
  console.log(theme)
  return (
    <Flex flexDirection={'column'}>
      <Heading fontSize={'xl'} mb={4}>今日熱門</Heading>
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
              <Image
                borderTopRadius={12}
                src={`${posterImageUrl[breakpoint as Breakpoints]}${movie.poster_path}`}
               />
              <VStack p={2} alignItems={'start'} gap={1}>
                <Text fontWeight={600} fontSize={['sm', 'sm', 'md']}>{traditionalized(movie.title)}</Text>
                <Text fontSize='xs'>平均分數：{(movie.vote_average)}</Text>
              </VStack>
            </GridItem>
          )
        })}
      </Grid>
    </Flex>
  )
}

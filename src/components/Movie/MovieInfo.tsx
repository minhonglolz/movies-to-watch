import { useNavigate, useParams } from 'react-router-dom'
import { type MovieDetailParams, type MovieDetail, type MovieCredits } from '../../types/Discoverd/Movies'
import { useEffect, useMemo } from 'react'
import { getURLWithParams } from '../../utils/urlParams'
import useSWR from 'swr'
import { tmdbSWRFetcher } from '../../utils/swrFetcher'
import { Avatar, Button, Flex, Grid, HStack, Heading, IconButton, Link, Tag, Text } from '@chakra-ui/react'
import { Poster } from './Poster'
import dayjs from 'dayjs'
import { traditionalized } from '../../utils/traditionalized'
import { MAX_DISPLAY_CAST, PEOPLE_IMAGE_URL_X1 } from '../../constants/movies'
import { type TMDBErrorResponse } from '../../types/TMDB/TMDBErrorResponse'
import { convertToHourMinute } from '../../utils/convertToHourMinute'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FaImdb } from 'react-icons/fa'

export function MovieInfo () {
  const { id } = useParams()
  const navigate = useNavigate()

  const movieDetailKey = useMemo(() => {
    const params: MovieDetailParams = {
      language: 'zh-TW'
    }
    return getURLWithParams(`https://api.themoviedb.org/3/movie/${id}`, params)
  }, [id])

  const movieCreditsKey = useMemo(() => {
    const params: MovieDetailParams = {
      language: 'zh-TW'
    }
    return getURLWithParams(`https://api.themoviedb.org/3/movie/${id}/credits`, params)
  }, [id])

  const { data: movieDetail, error: movieDetailError } = useSWR<MovieDetail, TMDBErrorResponse>(movieDetailKey, tmdbSWRFetcher, { focusThrottleInterval: 500000 })
  const { data: movieCredits, error: movieCreditsError } = useSWR<MovieCredits, TMDBErrorResponse>(movieCreditsKey, tmdbSWRFetcher, { focusThrottleInterval: 500000 })

  useEffect(() => {
    if (movieDetailError?.success != null || movieCreditsError?.success != null) {
      navigate('/404')
    }
  }, [movieCreditsError?.success, movieDetailError?.success, navigate])

  const movieDirectors = useMemo(() => movieCredits?.crew.filter(({ job }) => job === 'Director'), [movieCredits?.crew])

  const displayMovieCast = useMemo(() => {
    if (movieCredits == null) return []
    const _displayMovieCast: MovieCredits['cast'] = []
    for (let i = 0; i < Math.min(MAX_DISPLAY_CAST, movieCredits?.cast.length); i++) {
      _displayMovieCast.push(movieCredits.cast[i])
    }
    return _displayMovieCast
  }, [movieCredits])

  return (
    (movieDetail != null)
      ? <>
        <Flex justifyContent={'space-between'}>
          <IconButton onClick={() => navigate(-1)} aria-label='back icon' icon={<ArrowBackIcon />} alignSelf={'flex-start'} mb={6} />
          <Button>加入待看清單</Button>
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} alignItems={'center'} gap={6}>
          <Poster posterUrl={movieDetail?.poster_path} id={Number(id)} />
          <Flex direction={'column'} gap={4} textAlign={{ base: 'center', md: 'left' }}>
            <Heading fontSize={['xl', '3xl']}>{movieDetail.title} {`(${dayjs(movieDetail.release_date).format('YYYY')})`}</Heading>
            <Text fontWeight={800} fontSize={['md', 'lg']}>平均分數： {Math.floor(Number(movieDetail.vote_average) * 10) / 10}</Text>
            <Flex fontSize={['md', 'lg']} gap={2} flexDirection={'column'} alignItems={{ base: 'center', md: 'flex-start' }}>
              <HStack gap={2}>
                <Tag>{dayjs(movieDetail.release_date).format('YYYY/MM/DD')}</Tag>
                <Tag>{convertToHourMinute(movieDetail.runtime)}</Tag>
              </HStack>
              <HStack gap={2}>
                {movieDetail.genres.map(({ id, name }) => (
                  <Tag key={id}>{traditionalized(name)}</Tag>
                ))}
              </HStack>
            </Flex>
            <Text textAlign={'left'}>{movieDetail.overview}</Text>
          </Flex>
        </Flex>
        <Flex mt={6}>
          {movieDetail.homepage && <Button as={'a'} href={movieDetail.homepage}>官方網站</Button>}
          {movieDetail.imdb_id &&
            <Link isExternal href={`https://www.imdb.com/title/${movieDetail.imdb_id}`}>
              <Button leftIcon={<FaImdb />}>IMDB</Button>
            </Link>}
        </Flex>
        <Flex w={'100%'} flexDirection={'column'} mt={6}>
          <Text fontWeight={800} fontSize={['lg', 'xl']} mb={2}>導演</Text>
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
            {movieDirectors?.map((director) => (
              <HStack key={director.id}>
                <Avatar
                  name={director.name}
                  borderRadius='full'
                  boxSize={['50px', '65px', '80px']}
                  src={`${PEOPLE_IMAGE_URL_X1}${director.profile_path}`}
                />
                <Text fontWeight={800}>{director.name}</Text>
              </HStack>
            ))}
          </Grid>
        </Flex>
        <Flex w={'100%'} flexDirection={'column'} mt={6}>
          <HStack mb={6}>
            <Text fontWeight={800} fontSize={['lg', 'xl']}>演員陣容</Text>
            <Button>查看全部</Button>
          </HStack>
          <Flex overflowX={'scroll'} gap={4}>
            <HStack>
              {displayMovieCast.map((director) => (
                <Avatar
                  key={director.id}
                  name={director.name}
                  borderRadius='full'
                  boxSize={['50px', '65px', '80px']}
                  src={`${PEOPLE_IMAGE_URL_X1}${director.profile_path}`}
                />
              ))}
            </HStack>
          </Flex>
        </Flex>
      </>
      : <></>
  )
}

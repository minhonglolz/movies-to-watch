import { useNavigate, useParams } from 'react-router-dom'
import { type MovieDetailParams, type MovieDetail, type MovieCredits } from '../../types/Discoverd/Movies'
import { useEffect, useMemo } from 'react'
import { getURLWithParams } from '../../utils/urlParams'
import { Button, Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useTmdbSWR } from '../../hooks/useTmdbSWR'
import { MovieIntroduction } from './MovieIntroduction'
import { MovieLinks } from './MovieLinks'
import { MovieDirectors } from './MovieDirectors'
import { MovieSeriesCast } from './MovieSeriesCast'

export function MovieInfo () {
  const { id } = useParams()
  const navigate = useNavigate()

  const movieDetailKey = useMemo(() => {
    const params: MovieDetailParams = {
      language: 'zh-TW'
    }
    return getURLWithParams(`https://api.themoviedb.org/3/movie/${id}`, params)
  }, [id])
  const { data: movieDetail, error: movieDetailError } = useTmdbSWR<MovieDetail>(movieDetailKey)

  const movieCreditsKey = useMemo(() => {
    const params: MovieDetailParams = {
      language: 'zh-TW'
    }
    return getURLWithParams(`https://api.themoviedb.org/3/movie/${id}/credits`, params)
  }, [id])
  const { data: movieCredits, error: movieCreditsError } = useTmdbSWR<MovieCredits>(movieCreditsKey)

  useEffect(() => {
    if (movieDetailError?.success != null || movieCreditsError?.success != null) {
      navigate('/404')
    }
  }, [movieCreditsError?.success, movieDetailError?.success, navigate])

  return (
    <>
      <Flex justifyContent={'space-between'}>
        <IconButton
          variant={'outline'}
          onClick={() => navigate('/')}
          aria-label='back icon'
          icon={<ArrowBackIcon />}
          alignSelf={'flex-start'}
          mb={6}
        />
        <Button>加入待看清單</Button>
      </Flex>
      {(movieDetail && movieCredits)
        ? <>
          <MovieIntroduction
            posterPath={movieDetail.poster_path}
            title={movieDetail.title}
            releaseDate={movieDetail.release_date}
            genres={movieDetail.genres}
            overview={movieDetail.overview}
            runtime={movieDetail.runtime}
            voteAverage={movieDetail.vote_average}
          />
          <MovieLinks
            homepage={movieDetail.homepage}
            imdbId={movieDetail.imdb_id}
          />
          <MovieDirectors movieCreditsCrew={movieCredits.crew} />
          <MovieSeriesCast movieCreditsCast={movieCredits.cast} />
        </>
        : <></>
    }
    </>
  )
}

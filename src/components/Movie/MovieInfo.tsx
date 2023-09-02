import { useNavigate, useParams } from 'react-router-dom'
import { type MovieDetailParams, type MovieDetail, type MovieCredits } from '../../types/Discoverd/Movies'
import { useEffect, useMemo } from 'react'
import { getURLWithParams } from '../../utils/urlParams'
import { Button, Flex } from '@chakra-ui/react'
import { useTmdbSWR } from '../../hooks/useTmdbSWR'
import { MovieSynopsis } from './MovieSynopsis'
import { MovieLinks } from './MovieLinks'
import { MovieDirectors } from './MovieDirectors'
import { MovieSeriesCast } from './MovieSeriesCast'
import { MovieReviews } from './MovieReviews'

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

      {(movieDetail && movieCredits)
        ? <>
          <Flex justifyContent={'flex-end'} mb={4}>
            <Button>加入待看清單</Button>
          </Flex>
          <Flex flexDirection={'column'} gap={6}>
            <MovieSynopsis
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
            <MovieReviews />
          </Flex>
        </>
        : <></>
    }
    </>
  )
}

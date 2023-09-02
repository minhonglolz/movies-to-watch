import { useNavigate, useParams } from 'react-router-dom'
import { type MovieDetailParams, type MovieDetail, type MovieCredits } from '../../types/Discoverd/Movies'
import { useEffect, useMemo } from 'react'
import { getURLWithParams } from '../../utils/urlParams'
import { Flex } from '@chakra-ui/react'
import { useTmdbSWR } from '../../hooks/useTmdbSWR'
import { MovieSynopsis } from './MovieSynopsis'
import { MovieLinks } from './MovieLinks'
import { MovieDirectors } from './MovieDirectors'
import { MovieSeriesCast } from './MovieSeriesCast'
import { MovieReviews } from './MovieReviews'
import ButtonIconHeartToggle from '../ButtonIconHeartToggle'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { useToast } from '../../hooks/useToast'
import { useWatchList } from '../../hooks/useWatchList'
import { useAuthState } from '../../hooks/useAuthState'

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

  const { watchListIdMap: watchListIdSet } = useSelector((state: RootState) => state.watchList)
  const hasWatchListId = !!watchListIdSet?.has(Number(id))

  const { showErrorToast } = useToast()
  const { addWatchList, removeWatchList, isLoading } = useWatchList()
  const { googleAuth } = useAuthState()

  const handleClickToggleWatchList = () => {
    if (!movieDetail) return
    if (!googleAuth) {
      showErrorToast('為了記住您的待看清單，請先登入')
      return
    }
    if (isLoading) return
    if (hasWatchListId) {
      removeWatchList(Number(id))
    } else {
      addWatchList({
        id: movieDetail.id,
        overview: movieDetail.overview,
        popularity: movieDetail.popularity,
        posterPath: movieDetail.poster_path,
        releaseDate: movieDetail.release_date,
        title: movieDetail.title,
        voteAverage: movieDetail.vote_average,
        voteCount: movieDetail.vote_count
      })
    }
  }

  return (
    <>

      {(movieDetail && movieCredits)
        ? <>
          <Flex justifyContent={'flex-end'} mb={4}>
            <ButtonIconHeartToggle
              isFill={hasWatchListId}
              onClick={handleClickToggleWatchList}
            />
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

import useSWR, { type Key } from 'swr'
import { tmdbSWRFetcher } from '../utils/swrFetcher'
import { type TMDBErrorResponse } from '../types/TMDB/TMDBErrorResponse'

export function useTmdbSWR<Response> (key: Key) {
  return useSWR<Response, TMDBErrorResponse>(key, tmdbSWRFetcher, { focusThrottleInterval: 500000 })
}

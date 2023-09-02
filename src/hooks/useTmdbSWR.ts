import useSWR, { type Key } from 'swr'
import { tmdbSWRFetcher } from '../utils/swrFetcher'
import { type TmdbErrorResponse } from '../types/Tmdb/TmdbErrorResponse'

export function useTmdbSWR<Response> (key: Key) {
  return useSWR<Response, TmdbErrorResponse>(key, tmdbSWRFetcher, { focusThrottleInterval: 500000 })
}

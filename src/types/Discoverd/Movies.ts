import { type StringBooleanUnion } from '../StringBoolean'
import { type TMDBListResponse } from '../TMDB/TMDBListResponse'

export interface Movie {
  poster_path?: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path?: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export type MovieResponse = TMDBListResponse<Movie>

export type SortByUnion = 'popularity.asc' | 'popularity.desc' | 'primary_release_date.asc' |
'primary_release_date.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc'

export interface DiscoverMovieParams extends Record<string, unknown> {
  include_adult?: StringBooleanUnion
  include_video?: StringBooleanUnion
  page: number
  sort_by: SortByUnion
  watch_region?: 'TW'
  language?: 'zh-TW'
  'release_date.gte'?: string
  'release_date.lte'?: string
  'vote_average.gte': number
  'vote_average.lte': number
  'vote_count.gte': number
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
  certification_country?: 'TW'
}

export type sortByOptionsType = Array<{ label: string, value: SortByUnion }>
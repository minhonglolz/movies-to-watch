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

export interface MovieDetailParams extends Record<string, unknown> {
  language: 'zh-TW'
}
export interface MovieDetail {
  id: number
  backdrop_path: string
  budget: number
  revenue: number
  homepage: string
  imdb_id: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  runtime: number
  vote_average: string
  vote_count: string
  genres: Array<{
    id: number
    name: string
  }>
}

export interface MovieCreditsParams extends Record<string, unknown> {
  language: 'zh-TW'
}
export interface MovieCredits {
  id: number
  cast: Array<{
    adult: boolean
    id: number
    name: string
    original_name: string
    profile_path: string
    character: string
  }>
  crew: Array<{
    adult: false
    gender: 2
    id: 7626
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
  }>
}

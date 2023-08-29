import { type MovieResponse } from '../Discoverd/Movies'

export interface SearchMovieParams extends Record<string, unknown> {
  query: string
  language: 'zh-TW'
  page: number
}

export type SearchMovieResponse = MovieResponse

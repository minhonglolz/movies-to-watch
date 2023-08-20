export interface TMDBListResponse<T> {
  page: number
  results: T[]
  total_results: number
  total_pages: number
}

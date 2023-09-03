import { type CardMovieProps } from '../components/CardMovie'
import { type Movie } from '../types/Discoverd/Movies'

export function truncateToDecimal (number: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces)
  const truncatedNumber = Math.floor(number * factor) / factor
  return truncatedNumber
}

export function convertMovieTypeToCardMovieType (movie: Movie): CardMovieProps {
  return {
    ...movie,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
    voteCount: movie.vote_count
  }
}

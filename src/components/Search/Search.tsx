import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input, SimpleGrid } from '@chakra-ui/react'
import { type ChangeEvent, useMemo, useState } from 'react'
import { type SearchMovieResponse, type SearchMovieParams } from '../../types/Search.ts/Search'
import { getURLWithParams } from '../../utils/urlParams'
import useSWR from 'swr'
import { tmdbSWRFetcher } from '../../utils/swrFetcher'
import { CardMovie } from '../CardMovie'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Pagination } from '../Pagination'
import useDebounceCallback from '../../hooks/useDebounceCallback'

const getSearchParams = (query: string, page: number) => {
  return query ? `?query=${query}&page=${page}` : ''
}

export function Search () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const page = searchParams.get('page') == null ? 1 : Number(searchParams.get('page'))
  const [searchInput, setSearchInput] = useState(query)
  const { debounceCallback } = useDebounceCallback()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    debounceCallback(() => {
      navigate(`/search${getSearchParams(value, 1)}`)
    }, 500)
  }

  const key = useMemo(() => {
    if (!query) return null
    const params: SearchMovieParams = {
      language: 'zh-TW',
      page: Number(page),
      query
    }
    return getURLWithParams('https://api.themoviedb.org/3/search/movie', params)
  }, [page, query])

  const { data } = useSWR<SearchMovieResponse>(key, tmdbSWRFetcher, { revalidateOnFocus: false })

  const handleChangePage = (page: number) => {
    navigate(`/search${getSearchParams(query, page)}`)
  }

  return (
    <>
      <InputGroup h={'40px'} w='full'>
        <InputLeftElement
          pl={4}
          pointerEvents="none"
          children={<SearchIcon className="SearchIcon" color="gray.300" />}
        />
        <Input
          h={'40px'}
          borderRadius={'40px'}
          placeholder='搜尋電影'
          value={searchInput}
          onChange={handleChangeInput}
        />
      </InputGroup>
      <SimpleGrid mt={6} gap={6} columns={[2, 4, 5]}>
        {data?.results.map((movie) => {
          return (
            <CardMovie
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
            />
          )
        })}
      </SimpleGrid>
      {data?.total_pages &&
        <Pagination
          totalPages={data.total_pages}
          currentPage={page}
          onChangePage={handleChangePage}
        />
      }
    </>
  )
}

import tmdbBaseAxios from './tmdbBaseAxios'

export const tmdbSWRFetcher = async (url: string) =>
  await tmdbBaseAxios().get(url, { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` } })
    .then(response => response.data)

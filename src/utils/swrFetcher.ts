import { tmdbBaseAxios } from './tmdbBaseAxios'

export const tmdbSWRFetcher = async (url: string) =>
  await tmdbBaseAxios().get(url)
    .then(response => response.data)

import axios from 'axios'

export function tmdbBaseAxios () {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.TMDB_API_ROOT,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return axiosInstance
}

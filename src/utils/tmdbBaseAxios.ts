/* eslint-disable @typescript-eslint/no-throw-literal */
import axios, { type AxiosError } from 'axios'
import { type TmdbErrorResponse } from '../types/Tmdb/TmdbErrorResponse'

export default function tmdbBaseAxios () {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.TMDB_API_ROOT,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  /** Response Interceptor */
  axiosInstance.interceptors.response.use(
    (response) => {
      // Status code isn't a success code - throw error
      if (!`${response.status}`.startsWith('2')) {
        throw response.data
      }

      // Otherwise just return the data
      return response
    },
    (error: AxiosError<TmdbErrorResponse>) => {
      if ((error?.response?.data) != null) {
        throw error.response.data
      }
      throw error
    }
  )
  return axiosInstance
}

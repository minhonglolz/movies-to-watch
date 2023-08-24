import dayjs from 'dayjs'
import { type sortByOptionsType, type DiscoverMovieParams } from '../types/Discoverd/Movies'

export const DRAWER_MOVIES_SORT_BY_OPTIONS: sortByOptionsType = [
  { label: '按人氣降序', value: 'popularity.desc' },
  { label: '按人氣升序', value: 'popularity.asc' },
  { label: '按評分降序', value: 'vote_average.desc' },
  { label: '按評分升序', value: 'vote_average.asc' },
  { label: '按上評分數降序', value: 'vote_count.desc' },
  { label: '按上評分數升序', value: 'vote_count.asc' },
  { label: '按上映日期降序', value: 'primary_release_date.desc' },
  { label: '按上映日期升序', value: 'primary_release_date.asc' }
]

export const MOVIES_INIT_FILTER: DiscoverMovieParams = {
  include_adult: 'false',
  include_video: 'false',
  language: 'zh-TW',
  page: 1,
  sort_by: 'popularity.desc',
  'release_date.gte': dayjs().format('YYYY-MM-DD'),
  'release_date.lte': dayjs().add(5, 'M').format('YYYY-MM-DD'),
  'vote_average.gte': 1,
  'vote_average.lte': 10,
  'vote_count.gte': 0
}

export const POSTER_IMAGE_URL_X1 = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
export const POSTER_IMAGE_URL_X2 = 'https://www.themoviedb.org/t/p/w440_and_h660_face/'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WatchList } from './WatchList/WatchList'
import App from '../App'
import { NotFound } from './NotFound'
import { Home } from './Home/Home'
import { MovieInfo } from './Movie/MovieInfo'
import { Search } from './Search/Search'

export function Routes () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <Home /> },
        { path: 'movie/:id', element: <MovieInfo /> },
        { path: 'watch-list', element: <WatchList /> },
        { path: 'search', element: <Search /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

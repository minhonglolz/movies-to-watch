import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WatchList } from './WatchList/WatchList'
import App from '../App'
import { NotFound } from './NotFound'
import { Home } from './Home/Home'
import { MovieInfo } from './Movie/MovieInfo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'movie/:id', element: <MovieInfo /> },
      { path: 'watch-list', element: <WatchList /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

export function Routes () {
  return (
    <RouterProvider router={router} />
  )
}

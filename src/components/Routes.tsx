import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WatchList } from './WatchList/WatchList'
import App from '../App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'watch-list',
        element: <WatchList/>
      }
    ]
  }
])

export function Routes () {
  return (
    <RouterProvider
          router={router}
          // fallbackElement={<BigSpinner />}
        />
  )
}

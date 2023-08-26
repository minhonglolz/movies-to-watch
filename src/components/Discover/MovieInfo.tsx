import { useParams } from 'react-router-dom'

export function MovieInfo () {
  const { id } = useParams()
  return (
    <>
      {id}
    </>
  )
}

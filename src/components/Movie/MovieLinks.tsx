import { Flex, Button, Link } from '@chakra-ui/react'
import { FaImdb } from 'react-icons/fa'
import { type MovieDetail } from '../../types/Discoverd/Movies'

interface Props {
  homepage: MovieDetail['homepage']
  imdbId: MovieDetail['imdb_id']
}

export function MovieLinks ({ homepage, imdbId }: Props) {
  return (
    <Flex>
      {homepage && <Button as={'a'} href={homepage}>官方網站</Button>}
      {imdbId &&
        <Link isExternal href={`https://www.imdb.com/title/${imdbId}`}>
          <Button leftIcon={<FaImdb />}>IMDB</Button>
        </Link>}
    </Flex>
  )
}

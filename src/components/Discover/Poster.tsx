import { AspectRatio, Box, Image, useMediaQuery, useTheme } from '@chakra-ui/react'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import noImage from '../../assets/noImage.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Movie } from '../../types/Discoverd/Movies'

interface Props {
  id: Movie['id']
  posterPath: Movie['poster_path']
  title: Movie['title']
  voteAverage: Movie['vote_average']
  overview: Movie['overview']
}

export function Poster (props: Props) {
  const { posterPath, id } = props

  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const [isLoad, setIsLoad] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()

  const imageProps = {
    onClick: () => navigate(`/movie/${id}`),
    cursor: 'pointer'
  }

  return (
    <Box overflow={'hidden'} borderTopRadius={'12px'}>
      {posterPath != null
        ? <AspectRatio ratio={2 / 3}>
          <Image
            {...imageProps}
            opacity={isLoad ? 1 : 0}
            w={'full'}
            h={'full'}
            objectFit={'cover'}
            backgroundColor={theme.colors.gray[900]}
            transition={'opacity .5s'}
            onLoad={() => setIsLoad(true)}
            _hover={{ opacity: 0.6 }}
            src={`${isLargerThanLg ? POSTER_IMAGE_URL_X2 : POSTER_IMAGE_URL_X1}${posterPath}`}
          />
        </AspectRatio>
        : <AspectRatio ratio={2 / 3}>
          <Image
            {...imageProps}
            objectFit={'fill'}
            src={noImage}
          />
        </AspectRatio>
          }
    </Box>
  )
}

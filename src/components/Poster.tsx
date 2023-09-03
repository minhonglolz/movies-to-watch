import { AspectRatio, Image, type ImageProps, useTheme, Box } from '@chakra-ui/react'
import { POSTER_IMAGE_URL_X2 } from '../constants/movies'
import noImage from '../assets/noImage.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { type Movie } from '../types/Discoverd/Movies'

interface Props {
  id: Movie['id']
  posterPath: Movie['poster_path']
  imageProps?: ImageProps
  canClick?: boolean
}

export function Poster ({ imageProps, canClick = true, ...movie }: Props) {
  const { posterPath, id } = movie

  const [isLoad, setIsLoad] = useState(false)
  const theme = useTheme()

  return (
    <>
      {posterPath != null
        ? <AspectRatio ratio={2 / 3}>
          <Box as={canClick ? Link : undefined} to={`/movie/${id}`}>
            <Image
              opacity={isLoad ? 1 : 0}
              w="full"
              h="full"
              objectFit="cover"
              backgroundColor={theme.colors.gray[900]}
              transition="opacity .5s"
              onLoad={() => setIsLoad(true)}
              src={`${POSTER_IMAGE_URL_X2}${posterPath}`}
              {...(canClick && { _hover: { opacity: 0.6 } })}
              {...imageProps}
            />
          </Box>
        </AspectRatio>
        : <AspectRatio ratio={2 / 3}>
          <Box as={canClick ? Link : undefined} to={`/movie/${id}`}>
            <Image
              objectFit="fill"
              src={noImage}
              {...imageProps}
            />
          </Box>
        </AspectRatio>}
    </>
  )
}

import { Box, Image, useMediaQuery, useTheme } from '@chakra-ui/react'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import noImage from '../../assets/noImage.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Movie } from '../../types/Discoverd/Movies'

interface Props {
  posterUrl?: string
  id: Movie['id']
}

export function Poster ({ posterUrl, id }: Props) {
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const [isLoad, setIsLoad] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()

  const imageProps = {
    onClick: () => navigate(`movie/${id}`),
    cursor: 'pointer',
    borderTopRadius: 12
  }

  return (
    <Box h={'100%'} overflow={'hidden'} borderRadius={12}>
      {posterUrl != null
        ? <Image
            {...imageProps}
            opacity={isLoad ? 1 : 0}
            h={isLoad ? 'auto' : [150, 180, 320]}
            backgroundColor={theme.colors.gray[900]}
            transition={'all .5s'}
            onLoad={() => setIsLoad(true)}
            _hover={{
              opacity: 0.8,
              transform: 'scale(1.05)'
            }}
            src={`${isLargerThanLg ? POSTER_IMAGE_URL_X2 : POSTER_IMAGE_URL_X1}${posterUrl}`}
          />
        : <Image
            {...imageProps}
            h={'100%'}
            objectFit={'cover'}
            borderTopRadius={12}
            src={noImage}
          />
          }
    </Box>
  )
}

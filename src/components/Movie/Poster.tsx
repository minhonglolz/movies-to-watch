import { Box, Image, useTheme } from '@chakra-ui/react'
import { POSTER_IMAGE_URL_X3 } from '../../constants/movies'
import noImage from '../../assets/noImage.svg'
import { useState } from 'react'
import { type Movie } from '../../types/Discoverd/Movies'

interface Props {
  posterUrl?: string
  id: Movie['id']
}

export function Poster ({ posterUrl }: Props) {
  const [isLoad, setIsLoad] = useState(false)
  const theme = useTheme()

  return (
    <Box h={'100%'} borderRadius={12} marginRight={{ base: 0, md: '20px' }}>
      {posterUrl != null
        ? <Box borderRadius={12} overflow={'hidden'} backgroundColor={theme.colors.gray[900]}>
          <Image
            maxW={[250, 300]}
            opacity={isLoad ? 1 : 0}
            h={isLoad ? 'auto' : [300, 450]}
            transition={'all 1s'}
            onLoad={() => setIsLoad(true)}
            src={`${POSTER_IMAGE_URL_X3}${posterUrl}`}
          />
        </Box>
        : <Image
            borderRadius={12}
            h={'100%'}
            objectFit={'cover'}
            borderTopRadius={12}
            src={noImage}
          />
          }
    </Box>
  )
}

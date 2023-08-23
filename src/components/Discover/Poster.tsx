import { Image, useMediaQuery } from '@chakra-ui/react'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import noImage from '../../assets/noImage.svg'

interface Props {
  posterUrl?: string
}

export function Poster ({ posterUrl }: Props) {
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  return (
    <>
      {posterUrl != null
        ? <Image
            borderTopRadius={12}
            src={`${isLargerThanLg ? POSTER_IMAGE_URL_X2 : POSTER_IMAGE_URL_X1}${posterUrl}`}
              />
        : <Image
            h={'100%'}
            objectFit={'cover'}
            borderTopRadius={12}
            src={noImage}
              />
          }
    </>
  )
}

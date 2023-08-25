import { Image, useMediaQuery } from '@chakra-ui/react'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import noImage from '../../assets/noImage.svg'
import { useState } from 'react'

interface Props {
  posterUrl?: string
}

export function Poster ({ posterUrl }: Props) {
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const [isLoad, setIsLoad] = useState(false)
  return (
    <>
      {posterUrl != null
        ? <Image
            opacity={isLoad ? 1 : 0}
            backgroundColor={'#000'}
            transition={'all .5s'}
            onLoad={() => setIsLoad(true)}
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

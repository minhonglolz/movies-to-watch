import { useCallback, useEffect, useState } from 'react'
import { type FirebaseMovie } from '../../types/Discoverd/Movies'
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, keyframes, useDisclosure } from '@chakra-ui/react'
import { getRandom } from '../../utils/number'
import { LiaRandomSolid } from 'react-icons/lia'
import { Poster } from '../Poster'

const OPTION_MINIMUM_AMOUNT = 10

interface Props {
  movies: Array<{
    id: FirebaseMovie['id']
    posterPath: FirebaseMovie['posterPath']
  }>
}

export function WatchListSlot ({ movies }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const movieCount = movies.length
  const slotLength = Math.max(OPTION_MINIMUM_AMOUNT, movieCount)

  const [isStart, setIsStart] = useState(false)
  const [options, setOptions] = useState<Props['movies']>()
  const [prevMovie, setPrevMovie] = useState<Props['movies'][number]>()

  const getOptions = useCallback(() => {
    if (!movies.length) return null
    const _options = Array.from({ length: slotLength }).map(() => movies[getRandom(movieCount)])
    if (prevMovie) {
      _options[0] = {
        id: prevMovie.id,
        posterPath: prevMovie.posterPath
      }
    }
    setOptions(_options)
  }, [movieCount, movies, prevMovie, slotLength])

  useEffect(() => {
    if (!isStart) {
      getOptions()
    }
  }, [getOptions, isStart])

  const spin = keyframes`  
    from {
      transform: translateY(0%)
    }   
    to {
      transform: translateY(-${(slotLength - 1) * 100}%)
    }
  `

  const shaking = keyframes`  
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  `

  const spinAnimation = `${spin} 3s forwards`
  const shakingAnimation = `${shaking} .5s 3s`

  const handleClickStart = () => {
    setIsStart(true)
    if (options) {
      setPrevMovie(options.at(-1))
    }
  }

  const handleClose = () => {
    setIsStart(false)
    setPrevMovie(undefined)
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} leftIcon={<LiaRandomSolid />} variant="outline">隨機挑片</Button>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>隨機挑片</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={8} as={Flex} flexDirection="column" justifyContent="center" alignItems="center">
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              scaleY="auto"
              overflow="hidden"
              animation={isStart ? shakingAnimation : undefined}
              onAnimationEnd={() => setIsStart(false)}
            >
              <Box
                h="300px"
                w="200px"
                onAnimationEnd={(e) => e.stopPropagation()}
                animation={isStart ? spinAnimation : undefined}
              >
                {options?.map(({ id, posterPath }, index) => (
                  <Poster
                    key={index}
                    imageProps={{ mx: 'auto', borderRadius: 12 }}
                    id={id}
                    posterPath={posterPath}
                    canClick={!isStart && !!prevMovie}
                  />
                ))}
              </Box>
            </Flex>
            <Button
              w='100px'
              mt={4}
              onClick={handleClickStart}
              isDisabled={isStart}
            >
              轉動
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

import { Flex, HStack, Button, Avatar, Text, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useMemo } from 'react'
import { MAX_DISPLAY_CAST, PEOPLE_IMAGE_URL_X1 } from '../../constants/movies'
import { type MovieCredits } from '../../types/Discoverd/Movies'

interface Props {
  movieCreditsCast: MovieCredits['cast']
}

export function MovieSeriesCast ({ movieCreditsCast }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const displayMovieCast = useMemo(() => {
    if (movieCreditsCast == null) return []
    const _displayMovieCast: MovieCredits['cast'] = []
    for (let i = 0; i < Math.min(MAX_DISPLAY_CAST, movieCreditsCast.length); i++) {
      _displayMovieCast.push(movieCreditsCast[i])
    }
    return _displayMovieCast
  }, [movieCreditsCast])

  return (
    <>
      <Flex w={'100%'} flexDirection={'column'} mt={6}>
        <HStack mb={6}>
          <Text fontWeight={800} fontSize={['lg', 'xl']}>演員陣容</Text>
          <Button onClick={onOpen}>查看全部</Button>
        </HStack>
        <Flex overflowX={'scroll'} gap={4}>
          <HStack>
            {displayMovieCast.map((director) => (
              <Avatar
                key={director.id}
                name={director.name}
                borderRadius='full'
                boxSize={['50px', '65px', '80px']}
                src={`${PEOPLE_IMAGE_URL_X1}${director.profile_path}`}
              />
            ))}
          </HStack>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>演員陣容</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'column'} gap={2}>
              {movieCreditsCast.map((cast) => (
                <HStack>
                  <Avatar
                    key={cast.id}
                    name={cast.name}
                    borderRadius='full'
                    boxSize={['50px', '65px', '80px']}
                    src={`${PEOPLE_IMAGE_URL_X1}${cast.profile_path}`}
                  />
                  <Text>{cast.name}</Text>
                </HStack>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              關閉
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

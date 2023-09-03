import { Flex, HStack, Button, Avatar, Text, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useMemo } from 'react'
import { MAX_DISPLAY_CAST, PEOPLE_IMAGE_URL_X1 } from '../../constants/movies'
import { type MovieCredits } from '../../types/Discoverd/Movies'

interface Props {
  movieCreditsCast: MovieCredits['cast']
}

export function MovieSeriesCast ({ movieCreditsCast }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const displayMovieCast = useMemo(() => {
    return movieCreditsCast.slice(0, MAX_DISPLAY_CAST) ?? []
  }, [movieCreditsCast])

  return (
    <>
      <Flex w="100%" flexDirection="column">
        <HStack mb={6}>
          <Text fontWeight={800} fontSize={['lg', 'xl']}>演員陣容</Text>
          <Button variant="outline" onClick={onOpen}>查看全部</Button>
        </HStack>
        <Flex overflowX="auto" gap={4}>
          <HStack as="ul">
            {displayMovieCast.map((director) => (
              <Avatar
                as="li"
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
            <Flex as="ul" flexDirection="column" gap={2}>
              {movieCreditsCast.map((cast) => (
                <HStack as="li" key={cast.id}>
                  <Avatar
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
        </ModalContent>
      </Modal>
    </>
  )
}

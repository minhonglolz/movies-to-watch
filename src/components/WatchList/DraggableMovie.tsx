import { DragHandleIcon, DeleteIcon } from '@chakra-ui/icons'
import { HStack, VStack, Flex, Heading, Button, Box, Text, useColorModeValue, useTheme } from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'
import { truncateToDecimal } from '../../utils/tmdb'
import { traditionalized } from '../../utils/traditionalized'
import { type FirebaseMovie } from '../../types/Discoverd/Movies'
import { useWatchList } from '../../hooks/useWatchList'
import { Poster } from '../Poster'

interface Props {
  movie: FirebaseMovie
  index: number
}

export function DraggableMovie ({ movie, index }: Props) {
  const { removeWatchList } = useWatchList()
  const theme = useTheme()
  const cardBorderColor = useColorModeValue(theme.colors.gray[50], theme.colors.gray[400])
  const cardBackground = useColorModeValue('white', 'blackAlpha.900')

  return (
    <Draggable
      draggableId={String(movie.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <HStack
          {...provided.draggableProps}
          ref={provided.innerRef}
          w={'full'}
          borderRadius={12}
          border={`.5px solid ${cardBorderColor}`}
          shadow={'lg'}
          backgroundColor={cardBackground}
          opacity={snapshot.isDragging ? 0.8 : 1}
        >
          <Box minW={[130, 150]}>
            <Poster {...movie} imageProps={{ borderLeftRadius: '12px' }} />
          </Box>
          <VStack w='full' align={'flex-start'} p={4}>
            <Flex w={'full'} justifyContent={'space-between'} align={'center'}>
              <Heading fontSize={['md', 'xl']}>{movie.title}</Heading>
              <Box {...provided.dragHandleProps}>
                <DragHandleIcon boxSize={'18px'} />
              </Box>
            </Flex>
            <Text fontWeight={800} fontSize={['xs', 'sm']}>平均分數： {truncateToDecimal(movie.voteAverage, 1)} / 10</Text>
            <Text mb={2} textAlign={'left'} noOfLines={2}>{traditionalized(movie.overview)}</Text>
            <Button variant={'outline'} leftIcon={<DeleteIcon />} onClick={async () => await removeWatchList(movie.id)}>移除</Button>
          </VStack>
        </HStack>
      )}
    </Draggable>
  )
}

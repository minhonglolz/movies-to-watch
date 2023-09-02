import { AspectRatio, Flex, Heading, VStack, Image, useTheme, useMediaQuery, HStack, useColorModeValue, Text, Button, Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import { useNavigate } from 'react-router-dom'
import { truncateToDecimal } from '../../utils/tmdb'
import { traditionalized } from '../../utils/traditionalized'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'
import { useWatchList } from '../../hooks/useWatchList'
import { DragDropContext, Draggable, Droppable, type DropResult } from 'react-beautiful-dnd'
import { useCallback } from 'react'

const calculateDragToFirstSort = (firstSort: number) => firstSort / 2
const calculateDragToLastSort = (lastSort: number) => lastSort + 1
const calculateDragToBetweenSort = (prevSort: number, nextSort: number) => (prevSort + nextSort) / 2

export function WatchList () {
  const { watchList } = useSelector((state: RootState) => state.watchList)
  const navigate = useNavigate()
  const { removeWatchList, setMovieSort } = useWatchList()
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const theme = useTheme()
  const cardBorderColor = useColorModeValue(theme.colors.gray[100], theme.colors.gray[400])

  const imageProps = {
    onClick: () => navigate('/movie'),
    cursor: 'pointer'
  }

  const onDragEnd = useCallback(({ source, destination }: DropResult) => {
    if (!destination || !watchList) return

    const [destinationIndex, sourceIndex] = [destination.index, source.index]
    const isDragToFirst = destinationIndex === 0
    const isDragToLast = destinationIndex === watchList.length - 1
    const { id } = watchList[sourceIndex]

    if (!id) return

    if (isDragToFirst) {
      setMovieSort(id, calculateDragToFirstSort(watchList[0].sort))
    } else if (isDragToLast) {
      setMovieSort(id, calculateDragToLastSort(watchList.at(-1)?.sort as number))
    } else {
      const prevPosition = destinationIndex > sourceIndex ? 0 : -1
      const nextPosition = destinationIndex > sourceIndex ? 1 : 0
      const prev = watchList[destinationIndex + prevPosition]
      const next = watchList[destinationIndex + nextPosition]

      setMovieSort(id, calculateDragToBetweenSort(prev.sort, next.sort))
    }
  }, [setMovieSort, watchList])

  return (
    <Flex flexDirection={'column'}>
      {Array.isArray(watchList) && <>
        <Heading mb={4} fontSize={'xl'}>我的待看清單（{watchList?.length}）</Heading>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId={'droppableId'}>
            {(provided) => (
              <VStack
                spacing={4}
                py={4}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {watchList.map((movie, index) => (
                  <Draggable
                    draggableId={String(movie.id)}
                    key={movie.id}
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
                        background={'blackAlpha.900'}
                        opacity={snapshot.isDragging ? 0.8 : 1}
                      >
                        <AspectRatio ratio={2 / 3} minW={[130, 150]}>
                          <Image
                            {...imageProps}
                            w={'full'}
                            h={'full'}
                            objectFit={'cover'}
                            borderLeftRadius={'12px'}
                            backgroundColor={theme.colors.gray[900]}
                            transition={'opacity .5s'}
                            _hover={{ opacity: 0.6 }}
                            src={`${isLargerThanLg ? POSTER_IMAGE_URL_X2 : POSTER_IMAGE_URL_X1}${movie.posterPath}`}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                          />
                        </AspectRatio>
                        <VStack align={'flex-start'} p={4}>
                          <Flex w={'full'} justifyContent={'space-between'} align={'center'}>
                            <Heading fontSize={['md', 'xl']}>{movie.title}</Heading>
                            <Box {...provided.dragHandleProps}>
                              <DragHandleIcon boxSize={'18px'} />
                            </Box>
                          </Flex>
                          <Text fontWeight={800} fontSize={['xs', 'sm']}>平均分數： {truncateToDecimal(movie.voteAverage, 1)} / 10</Text>
                          <Text color={theme.colors.gray[100]} mb={2} textAlign={'left'} noOfLines={2}>{traditionalized(movie.overview)}</Text>
                          <Button leftIcon={<DeleteIcon />} onClick={async () => await removeWatchList(movie.id)}>移除</Button>
                        </VStack>
                      </HStack>
                    )}
                  </Draggable>

                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>

        </DragDropContext>
      </>}
    </Flex>
  )
}

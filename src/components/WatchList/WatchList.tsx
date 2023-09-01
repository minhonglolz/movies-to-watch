import { AspectRatio, Flex, Heading, VStack, Image, useTheme, useMediaQuery, HStack, useColorModeValue, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import { useNavigate } from 'react-router-dom'
import { truncateToDecimal } from '../../utils/tmdb'
import { traditionalized } from '../../utils/traditionalized'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'
import { useWatchList } from '../../hooks/useWatchList'
import { DragDropContext, Draggable, Droppable, type DropResult } from 'react-beautiful-dnd'
import { useCallback, useMemo } from 'react'

export const calculateDragInTheFirst = (first: number) => first / 2
export const calculateDragInTheLast = (last: number) => last + 1
export const calculateDragInBetween = (prev: number, next: number) => (prev + next) / 2

export function WatchList () {
  const { watchList } = useSelector((state: RootState) => state.watchList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { removeWatchList, setMovieSort } = useWatchList()
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const theme = useTheme()
  const cardBorderColor = useColorModeValue(theme.colors.gray[100], theme.colors.gray[400])
  const imageProps = {
    onClick: () => navigate('/movie'),
    cursor: 'pointer'
  }
  const sortedWatchList = useMemo(() => {
    if (!watchList) return null
    return [...watchList].sort((a, b) => a.sort - b.sort)
  }, [watchList])

  const onDragEnd = useCallback(({ source, destination }: DropResult) => {
    if (!destination || !sortedWatchList) return
    const isFirst = destination.index === 0
    const isLast = destination.index === sortedWatchList?.length - 1
    const { id } = sortedWatchList[source.index]
    if (!id) return
    if (isFirst) {
      setMovieSort(id, calculateDragInTheFirst(sortedWatchList[0].sort))
      // dispatch(setMovieSort({ id, sort: calculateDragInTheFirst(sortedWatchList[0].sort) }))
    } else if (isLast) {
      // dispatch(setMovieSort({ id, sort: calculateDragInTheLast(sortedWatchList.at(-1)?.sort as number) }))
      setMovieSort(id, calculateDragInTheLast(sortedWatchList.at(-1)?.sort as number))
    } else {
      const prev = sortedWatchList[destination.index].sort
      const next = sortedWatchList[destination.index + 1].sort
      setMovieSort(id, calculateDragInBetween(prev, next))
      // dispatch(setMovieSort({ id, sort: calculateDragInBetween(prev, next) }))
    }
  }, [setMovieSort, sortedWatchList])

  return (
    <Flex flexDirection={'column'}>
      {Array.isArray(sortedWatchList) && <>
        <Heading mb={4} fontSize={'xl'}>我的待看清單（{sortedWatchList?.length}）</Heading>
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
                {sortedWatchList.map((movie, index) => (
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

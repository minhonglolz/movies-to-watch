import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText, Spacer, Stack, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { useWatchList } from '../../hooks/useWatchList'
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd'
import { useCallback, useMemo } from 'react'
import { DraggableMovie } from './DraggableMovie'
import { MOVIES_SORT_BY_OPTIONS } from '../../constants/movies'
import { PageTitle } from '../PageTitle'
import { BiFilterAlt } from 'react-icons/bi'
import { LiaRandomSolid } from 'react-icons/lia'
import { WatchListSlot } from './WatchListSlot'

const calculateDragToFirstSort = (firstSort: number) => firstSort / 2
const calculateDragToLastSort = (lastSort: number) => lastSort + 1
const calculateDragToBetweenSort = (prevSort: number, nextSort: number) => (prevSort + nextSort) / 2

export function WatchList () {
  const { watchList } = useSelector((state: RootState) => state.watchList)
  const { setMovieSort, sortMovieList } = useWatchList()

  const onDragEnd = useCallback(({ source, destination }: DropResult) => {
    if (!destination || !watchList) return
    const noDragging = source.index === destination.index
    if (noDragging) return

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

  const slotOptions = useMemo(() => watchList?.map(({ posterPath, id }) => ({ id, posterPath })), [watchList])

  return (
    <Flex flexDirection="column">
      {watchList
        ? <>
          <Flex alignItems="center" mb={4}>
            <PageTitle>我的待看清單（{watchList.length}）</PageTitle>
            <Spacer />
            {!!slotOptions && <WatchListSlot movies={slotOptions} />}
            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                aria-label='Filter database'
                icon={<BiFilterAlt />}
              />
              <MenuList>
                {MOVIES_SORT_BY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} onClick={async () => await sortMovieList(option.value)}>{option.label}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
              {(provided) => (
                <VStack
                  spacing={4}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {watchList.map((movie, index) => (
                    <DraggableMovie
                      key={movie.id}
                      movie={movie}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
        </>
        : <Stack spacing={4}>
          <SkeletonText noOfLines={1} skeletonHeight='6' w="200px" />
          {new Array(3).fill('').map((_, index) => (
            <Skeleton key={index} height='200px' />
          ))}
        </Stack>}
    </Flex>
  )
}

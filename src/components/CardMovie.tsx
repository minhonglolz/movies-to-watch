import { GridItem, useColorModeValue, Text, useTheme, Grid } from '@chakra-ui/react'
import { traditionalized } from '../utils/traditionalized'
import { Poster } from './Poster'
import { Link } from 'react-router-dom'
import { type Movie } from '../types/Discoverd/Movies'
import { truncateToDecimal } from '../utils/tmdb'
import { useSelector } from 'react-redux'
import { type RootState } from '../store'
import { useWatchList } from '../hooks/useWatchList'
import ButtonIconHeartToggle from './ButtonIconHeartToggle'
import { useAuthState } from '../hooks/useAuthState'
import { useToast } from '../hooks/useToast'

interface Props {
  id: Movie['id']
  posterPath: Movie['poster_path']
  title: Movie['title']
  voteAverage: Movie['vote_average']
  overview: Movie['overview']
  releaseDate: Movie['release_date']
  popularity: Movie['popularity']
  voteCount: Movie['vote_count']
}

export function CardMovie (props: Props) {
  const { id, title, voteAverage } = props
  const theme = useTheme()
  const cardBorderColor = useColorModeValue(theme.colors.gray[50], theme.colors.gray[500])
  const { watchListIdMap: watchListIdSet } = useSelector((state: RootState) => state.watchList)
  const hasWatchListId = !!watchListIdSet?.has(id)

  const { addWatchList, removeWatchList, isLoading } = useWatchList()
  const { googleAuth } = useAuthState()
  const { showErrorToast } = useToast()

  const handleClickToggleWatchList = () => {
    if (!googleAuth) {
      showErrorToast('為了記住您的待看清單，請先登入')
      return
    }
    if (isLoading) return
    if (hasWatchListId) {
      removeWatchList(id)
    } else {
      addWatchList(props)
    }
  }
  return (
    <GridItem
      key={id}
      borderRadius={12}
      border={`.5px solid ${cardBorderColor}`}
      shadow="lg"
      display="flex"
      flexDirection="column"
    >
      <Poster {...props} imageProps={{ borderTopRadius: '12px' }} />
      <Grid templateColumns='repeat(8, 1fr)' py={4} px={2}>
        <GridItem colSpan={7} w="full" alignItems="start" gap={1}>
          <Text
            as={Link}
            to={`/movie/${id}`}
            fontWeight={600}
            fontSize={['sm', 'sm', 'md']}
            transition="opacity .3s"
            _hover={{
              opacity: 0.6
            }}
            noOfLines={1}
          >
            {traditionalized(title)}
          </Text>
          <Text fontSize='xs'>平均分數：{truncateToDecimal(voteAverage, 1)}</Text>
        </GridItem>
        <ButtonIconHeartToggle
          isFill={hasWatchListId}
          colSpan={1}
          onClick={handleClickToggleWatchList}
        />
      </Grid>
    </GridItem>
  )
}

import { GridItem, VStack, useColorModeValue, Text, useTheme } from '@chakra-ui/react'
import { traditionalized } from '../utils/traditionalized'
import { Poster } from './Discover/Poster'
import { useNavigate } from 'react-router-dom'
import { type Movie } from '../types/Discoverd/Movies'

interface Props {
  id: Movie['id']
  posterPath: Movie['poster_path']
  title: Movie['title']
  voteAverage: Movie['vote_average']
}

export function CardMovie ({ id, posterPath, title, voteAverage }: Props) {
  const theme = useTheme()
  const cardBorderColor = useColorModeValue(theme.colors.gray[50], theme.colors.gray[500])
  const navigate = useNavigate()
  return (
    <GridItem
      key={id}
      borderRadius={12}
      border={`.5px solid ${cardBorderColor}`}
      shadow={'2xl'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Poster posterUrl={posterPath} id={id} />
      <VStack p={2} alignItems={'start'} gap={1}>
        <Text
          onClick={() => { navigate(`/movie/${id}`) }}
          cursor={'pointer'}
          fontWeight={600}
          fontSize={['sm', 'sm', 'md']}
          transition={'opacity .3s'}
          _hover={{
            opacity: 0.6
          }}
        >
          {traditionalized(title)}
        </Text>
        <Text fontSize='xs'>平均分數：{(voteAverage)}</Text>
      </VStack>
    </GridItem>
  )
}

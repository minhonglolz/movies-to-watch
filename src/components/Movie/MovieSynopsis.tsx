import { Flex, Heading, HStack, Tag, Text, Box } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { convertToHourMinute } from '../../utils/convertToHourMinute'
import { traditionalized } from '../../utils/traditionalized'
import { type MovieDetail } from '../../types/Discoverd/Movies'
import { useParams } from 'react-router-dom'
import { truncateToDecimal } from '../../utils/tmdb'
import { Poster } from '../Poster'

interface Props {
  posterPath: MovieDetail['poster_path'],
  title: MovieDetail['title'],
  releaseDate: MovieDetail['release_date'],
  genres: MovieDetail['genres'],
  overview: MovieDetail['overview'],
  runtime: MovieDetail['runtime'],
  voteAverage: MovieDetail['vote_average'],
}

export function MovieSynopsis (props: Props) {
  const { genres, runtime, ...movie } = props
  const { posterPath, title, releaseDate, overview, voteAverage } = movie
  const { id } = useParams()

  return (
    <Flex direction={{ base: 'column', md: 'row' }} alignItems="center" gap={6}>
      <Box minW={[200, 300]} borderRadius={12} overflow="hidden">
        <Poster id={Number(id)} posterPath={posterPath} canClick={false} />
      </Box>
      <Flex direction="column" gap={4} textAlign={{ base: 'center', md: 'left' }}>
        <Heading fontSize={['xl', '3xl']}>
          {title}
          {' '}
          {`(${dayjs(releaseDate).format('YYYY')})`}
        </Heading>
        <Text fontWeight={800} fontSize={['md', 'lg']}>
          平均分數：
          {truncateToDecimal(voteAverage, 1)}
          {' '}
          / 10
        </Text>

        <Flex fontSize={['md', 'lg']} gap={2} flexDirection="column" alignItems={{ base: 'center', md: 'flex-start' }}>
          <HStack gap={2}>
            <Tag>{dayjs(releaseDate).format('YYYY/MM/DD')}</Tag>
            <Tag>{convertToHourMinute(runtime)}</Tag>
          </HStack>
          <HStack gap={2}>
            {genres.map(({ id, name }) => (
              <Tag key={id}>{traditionalized(name)}</Tag>
            ))}
          </HStack>
        </Flex>

        <Text textAlign="left">{overview}</Text>
      </Flex>
    </Flex>
  )
}

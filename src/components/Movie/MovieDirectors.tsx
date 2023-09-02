import { Flex, Grid, HStack, Avatar, Text } from '@chakra-ui/react'
import { PEOPLE_IMAGE_URL_X1 } from '../../constants/movies'
import { type MovieCredits } from '../../types/Discoverd/Movies'
import { useMemo } from 'react'

interface Props {
  movieCreditsCrew: MovieCredits['crew']
}

export function MovieDirectors ({ movieCreditsCrew }: Props) {
  const movieDirectors = useMemo(() =>
    movieCreditsCrew.filter(({ job }) => job === 'Director')
  , [movieCreditsCrew])

  return (
    <Flex w="100%" flexDirection="column">
      <Text fontWeight={800} fontSize={['lg', 'xl']} mb={2}>導演</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
        {movieDirectors?.map((director) => (
          <HStack key={director.id}>
            <Avatar
              name={director.name}
              borderRadius='full'
              boxSize={['50px', '65px', '80px']}
              src={`${PEOPLE_IMAGE_URL_X1}${director.profile_path}`}
            />
            <Text fontWeight={800}>{director.name}</Text>
          </HStack>
        ))}
      </Grid>
    </Flex>
  )
}

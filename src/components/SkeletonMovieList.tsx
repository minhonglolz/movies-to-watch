import { SimpleGrid, Skeleton } from '@chakra-ui/react'

export function SkeletonMovieList () {
  return (
    <SimpleGrid mt={6} gap={6} columns={[2, 4, 5]}>
      {new Array(20).fill('').map((_item, index) => (
        <Skeleton borderRadius={12} key={index} w="200" h="400" />
      ))}
    </SimpleGrid>
  )
}

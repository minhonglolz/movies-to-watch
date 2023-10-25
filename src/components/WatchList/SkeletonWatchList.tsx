import { Stack, SkeletonText, Skeleton } from '@chakra-ui/react'

export function SkeletonWatchList () {
  return (
    <Stack spacing={4}>
      <SkeletonText noOfLines={1} skeletonHeight="6" w="200px" />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} height="200px" />
      ))}
    </Stack>
  )
}

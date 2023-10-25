import { Flex, HStack, Skeleton, SkeletonCircle, SkeletonText, Stack, VStack } from '@chakra-ui/react'

export function SkeletonMovieInfo () {
  return (
    <Stack gap={8} overflow="auto">
      <Flex direction={{ base: 'column', md: 'row' }} alignItems="center" gap={6}>
        <Skeleton minW={[200, 300]} minH={[350, 450]} borderRadius={12} overflow="hidden" />
        <Flex w="full" direction="column" gap={4} textAlign={{ base: 'center', md: 'left' }}>
          <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="8" />
        </Flex>
      </Flex>
      <VStack align="self-start">
        <Skeleton h="40px" w="200px" mb={4} />
        <HStack>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCircle key={`director${index}`} size={['50px', '65px', '80px']} />
          ))}
        </HStack>
      </VStack>
      <VStack align="self-start">
        <Skeleton h="40px" w="200px" mb={4} />
        <HStack>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCircle key={`cast${index}`} size={['50px', '65px', '80px']} />
          ))}
        </HStack>
      </VStack>
    </Stack>

  )
}

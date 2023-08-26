import { Flex, HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import TMDBLogo from '../../assets/TMDB-logo.png'

const thisYear = new Date().getFullYear()

export function TheFooter () {
  return (
    <HStack p='4' justifyContent='space-between' gap={6} flexDirection={['column-reverse', 'row']}>
      <HStack gap='4'>
        <Text>© 2018 - {thisYear}</Text>
        <Text fontSize='md' fontWeight='600'>
          <Link target='_blank' to='https://minhong.me'>minhong.me</Link>
        </Text>
      </HStack>
      <Flex gap={'4'} justifyContent='center' alignItems={'center'}>
        <Text>Powered by</Text>
        <Link to="https://www.themoviedb.org/">
          <Image src={TMDBLogo} />
        </Link>
      </Flex>
    </HStack>
  )
}

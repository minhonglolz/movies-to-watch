import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import TMDBLogo from '../../assets/TMDB-logo.png'

const thisYear = new Date().getFullYear()

export function TheFooter () {
  return (
    <HStack p='8' justifyContent='space-between' gap={6}>
      <HStack gap='4'>
        <Text>© 2018 - {thisYear}</Text>
        <Text fontSize='md' fontWeight='600'>
          <Link to='https://minhong.me'>minhong.me</Link>
        </Text>
      </HStack>
      <HStack gap='4' justifyContent='center'>
        <Text>Powered by</Text>
        <Link to="https://www.themoviedb.org/">
          <Image src={TMDBLogo}/>
        </Link>
      </HStack>
    </HStack>
  )
}

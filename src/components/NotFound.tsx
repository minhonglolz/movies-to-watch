import { Box, Button, Heading, Image } from '@chakra-ui/react'
import ErrorImage from '../assets/404.png'
import { Link } from 'react-router-dom'

export function NotFound () {
  return (
    <Box>
      <Image w="50%" m="16px auto" src={ErrorImage} alt="404 error" />
      <Box textAlign="center">
        <Heading>找不到網頁</Heading>
        <Button mt={4}>
          <Link to="/">
            回首頁
          </Link>
        </Button>
      </Box>
    </Box>
  )
}

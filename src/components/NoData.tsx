import { SearchIcon } from '@chakra-ui/icons'
import { Heading, VStack } from '@chakra-ui/react'
import { type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export function NoData ({ children }: Props) {
  return (
    <VStack p={30} align="center" spacing={6}>
      <SearchIcon boxSize="200px" />
      <Heading fontSize={['lg', 'xl']}>很抱歉，查無資料</Heading>
      {children}
    </VStack>
  )
}

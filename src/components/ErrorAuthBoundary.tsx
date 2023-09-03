import { WarningTwoIcon } from '@chakra-ui/icons'
import { Heading, VStack } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { ButtonGoogleLogin } from './ButtonGoogleLogin'
import { useAuthState } from '../hooks/useAuthState'

interface Props {
  children?: ReactNode
}

export function ErrorAuthBoundary ({ children }: Props) {
  const { googleAuth } = useAuthState()
  return (
    <>
      {!googleAuth
        ? <VStack p={30} align="center" spacing={6}>
          <WarningTwoIcon boxSize="200px" />
          <Heading fontSize={['lg', 'xl']}>為了取得您的資訊，請先登入</Heading>
          <ButtonGoogleLogin variant="solid" />
        </VStack>
        : <>{children}</>}
    </>
  )
}

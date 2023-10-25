import { WarningTwoIcon } from '@chakra-ui/icons'
import { Button, Heading, Spinner, VStack } from '@chakra-ui/react'
import { type ReactNode } from 'react'

interface Props {
  isLoading: boolean,
  error: boolean,
  retryAction?: () => void,
  children?: ReactNode,
}

export function ErrorBoundary ({ retryAction, error, isLoading, children }: Props) {
  return (
    <>
      {error
        ? <VStack p={30} align="center" spacing={6}>
          <WarningTwoIcon boxSize="200px" />
          <Heading fontSize={['lg', 'xl']}>很抱歉，載入時出了些問題</Heading>
          <Button onClick={retryAction}>
            {isLoading ? <Spinner /> : '重新嘗試'}
            {' '}
          </Button>
        </VStack>
        : <>{children}</>}
    </>
  )
}

import { useToast as useBaseToast } from '@chakra-ui/react'

const toastProps = {
  position: 'top-right',
  duration: 2000,
  isClosable: true
} as const

export function useToast () {
  const toast = useBaseToast()
  const showSuccessToast = (title: string) => {
    toast({
      title,
      status: 'success',
      ...toastProps
    })
  }

  const showErrorToast = (title: string) => {
    toast({
      title,
      status: 'error',
      ...toastProps
    })
  }

  return { showSuccessToast, showErrorToast }
}

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text, type StackProps } from '@chakra-ui/react'

interface Props extends StackProps {
  onChangePage: (page: number) => void
  totalPages: number
  currentPage: number
}

export function Pagination ({
  totalPages,
  onChangePage,
  currentPage,
  ...props
}: Props) {
  const isLastPage = totalPages === currentPage
  const isFirstPage = currentPage <= 1
  return (
    <HStack
      height="48px"
      justifyContent="center"
      py={1}
      mt={6}
      {...props}
    >
      <HStack spacing={2} alignItems="center" gap={4}>

        <IconButton
          aria-label='prev page button'
          onClick={() => onChangePage(currentPage - 1)}
          isDisabled={isFirstPage}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Text fontSize={['lg', 'xl']} fontWeight={800}>{currentPage} / {totalPages}</Text>

        <IconButton
          aria-label='next page button'
          onClick={() => onChangePage(currentPage + 1)}
          isDisabled={isLastPage}
        >
          <ChevronRightIcon />
        </IconButton>

      </HStack>
    </HStack>
  )
}

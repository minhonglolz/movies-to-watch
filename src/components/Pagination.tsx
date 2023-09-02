import { HStack, IconButton, Text, type StackProps } from '@chakra-ui/react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

const iconButtonProps = {
  fontSize: '20px'
} as const

interface Props extends StackProps {
  onChangePage: (page: number) => void
  totalPages: number
  currentPage: number
  totalResults: number
}

export function Pagination ({
  totalPages,
  onChangePage,
  currentPage,
  totalResults,
  ...props
}: Props) {
  const isLastPage = totalPages === currentPage
  const isFirstPage = currentPage <= 1

  return (
    <>
      {totalResults
        ? <HStack
            height="48px"
            justifyContent="center"
            py={1}
            mt={6}
            {...props}
          >
          <HStack spacing={2} alignItems="center" gap={4}>

            <IconButton
              aria-label='first page button'
              onClick={() => {
                onChangePage(1)
                window.scrollTo(0, 0)
              }}
              isDisabled={isFirstPage}
              {...iconButtonProps}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </IconButton>
            <IconButton
              aria-label='prev page button'
              onClick={() => {
                onChangePage(currentPage - 1)
                window.scrollTo(0, 0)
              }}
              isDisabled={isFirstPage}
              {...iconButtonProps}
            >
              <MdOutlineKeyboardArrowLeft />
            </IconButton>

            <Text fontSize={['lg', 'xl']} fontWeight={800}>{currentPage} / {totalPages}</Text>

            <IconButton
              aria-label='next page button'
              onClick={() => {
                onChangePage(currentPage + 1)
                window.scrollTo(0, 0)
              }}
              isDisabled={isLastPage}
              {...iconButtonProps}
            >
              <MdOutlineKeyboardArrowRight />
            </IconButton>

            <IconButton
              aria-label='last page button'
              onClick={() => {
                onChangePage(totalPages)
                window.scrollTo(0, 0)
              }}
              isDisabled={isLastPage}
              {...iconButtonProps}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </IconButton>

          </HStack>
        </HStack>
        : <></>}
    </>

  )
}

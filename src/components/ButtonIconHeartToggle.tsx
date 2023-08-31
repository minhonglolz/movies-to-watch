import { GridItem, type GridItemProps } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type Props = GridItemProps & {
  isFill: boolean
}

export function ButtonIconHeartToggle ({ isFill, ...props }: Props) {
  return (
    <GridItem
      mt={'2px'}
      transition={'all .5s'}
      borderRadius={'20px'}
      w={'20px'}
      h={'20px'}
      aria-label={'more icon'}
      zIndex={1}
      fontSize={'20px'}
      color={'MenuText'}
      opacity={0.8}
      cursor={'pointer'}
      _hover={{ opacity: 1 }}
      {...props}
    >
      {isFill ? <AiFillHeart /> : <AiOutlineHeart />}
    </GridItem>
  )
}

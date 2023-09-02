import { GridItem, Tooltip, type GridItemProps, forwardRef, useColorModeValue } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type Props = GridItemProps & {
  isFill: boolean
}

function ButtonIconHeartToggle ({ isFill, ...props }: Props, ref: unknown) {
  const color = useColorModeValue('block', 'white')
  return (
    <Tooltip label={isFill ? '移除待看清單' : '加入待看清單'} fontSize='md'>
      <GridItem
        ref={ref}
        mt={'2px'}
        borderRadius={'20px'}
        w={'20px'}
        h={'20px'}
        aria-label={'more icon'}
        zIndex={1}
        fontSize={'20px'}
        color={color}
        opacity={0.8}
        cursor={'pointer'}
        _hover={{ opacity: 1 }}
        {...props}
      >
        {isFill ? <AiFillHeart /> : <AiOutlineHeart />}
      </GridItem>
    </Tooltip>
  )
}
export default forwardRef(ButtonIconHeartToggle)

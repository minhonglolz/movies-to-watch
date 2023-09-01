import { AspectRatio, Flex, Heading, VStack, Image, useTheme, useMediaQuery, HStack, useColorModeValue, Text, IconButton, Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { POSTER_IMAGE_URL_X2, POSTER_IMAGE_URL_X1 } from '../../constants/movies'
import { useNavigate } from 'react-router-dom'
import { truncateToDecimal } from '../../utils/tmdb'
import { traditionalized } from '../../utils/traditionalized'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'
import { useWatchList } from '../../hooks/useWatchList'

export function WatchList () {
  const { watchList } = useSelector((state: RootState) => state.watchList)
  const navigate = useNavigate()
  const { removeWatchList } = useWatchList()
  const [isLargerThanLg] = useMediaQuery('(min-width: 960px)')
  const theme = useTheme()
  const cardBorderColor = useColorModeValue(theme.colors.gray[100], theme.colors.gray[400])
  const imageProps = {
    onClick: () => navigate('/movie'),
    cursor: 'pointer'
  }

  return (
    <Flex flexDirection={'column'}>
      {Array.isArray(watchList) && <>
        <Heading mb={4} fontSize={'xl'}>我的待看清單（{watchList?.length}）</Heading>
        <VStack
          spacing={4}
          py={4}
        >
          {watchList?.map((movie) => (
            <HStack
              key={movie.id}
              w={'full'}
              borderRadius={12}
              border={`.5px solid ${cardBorderColor}`}
              shadow={'lg'}
            >
              <AspectRatio ratio={2 / 3} minW={[130, 150]}>
                <Image
                  {...imageProps}
                  w={'full'}
                  h={'full'}
                  objectFit={'cover'}
                  borderLeftRadius={'12px'}
                  backgroundColor={theme.colors.gray[900]}
                  transition={'opacity .5s'}
                  _hover={{ opacity: 0.6 }}
                  src={`${isLargerThanLg ? POSTER_IMAGE_URL_X2 : POSTER_IMAGE_URL_X1}${movie.posterPath}`}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </AspectRatio>
              <VStack align={'flex-start'} p={4}>
                <Flex w={'full'} justifyContent={'space-between'} align={'center'}>
                  <Heading fontSize={['md', 'xl']}>{movie.title}</Heading>
                  <IconButton
                    aria-label='delete'
                    variant={'unstyled'}
                    icon={<DragHandleIcon />}
                  />
                </Flex>
                <Text fontWeight={800} fontSize={['xs', 'sm']}>平均分數： {truncateToDecimal(movie.voteAverage, 1)} / 10</Text>
                <Text color={theme.colors.gray[100]} mb={2} textAlign={'left'} noOfLines={2}>{traditionalized(movie.overview)}</Text>
                <Button leftIcon={<DeleteIcon />} onClick={async () => await removeWatchList(movie.id)}>移除</Button>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </>}
    </Flex>
  )
}

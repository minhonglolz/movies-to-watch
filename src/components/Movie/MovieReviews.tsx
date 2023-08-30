import { Box, Button, Card, CardBody, Text, useColorModeValue, Link, Flex, useTheme, CardHeader, Skeleton, Stack, Avatar, Heading, VStack, HStack, Tag } from '@chakra-ui/react'
import { type MovieReviewsResponse, type MovieReviewsParams } from '../../types/Discoverd/Movies'
import { getURLWithParams } from '../../utils/urlParams'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTmdbSWR } from '../../hooks/useTmdbSWR'
import { MAX_DISPLAY_REVIEWS, PEOPLE_IMAGE_URL_X1 } from '../../constants/movies'
import dayjs from 'dayjs'
import { traditionalized } from '../../utils/traditionalized'

const getReviewerUrl = (author: string) => `https://www.themoviedb.org/u/${author}`

export function MovieReviews () {
  const { id } = useParams()
  const movieCreditsKey = useMemo(() => {
    const params: MovieReviewsParams = {
      language: 'zh-TW',
      page: 1
    }
    return getURLWithParams(`https://api.themoviedb.org/3/movie/${id}/reviews`, params)
  }, [id])
  const { data, isLoading } = useTmdbSWR<MovieReviewsResponse>(movieCreditsKey)
  const displayReviews = useMemo(() => {
    if (!data) return []
    const _displayReviews = []
    for (let i = 0; i < Math.min(data.results.length, MAX_DISPLAY_REVIEWS); i++) {
      _displayReviews.push(data.results[i])
    }
    return _displayReviews
  }, [data])
  const theme = useTheme()
  const cardBackground = useColorModeValue('', 'gray.500')
  const cardBorder = useColorModeValue(`1px solid ${theme.colors.gray[50]}`, `1px solid ${theme.colors.gray[500]}`)
  const hasReviews = displayReviews.length > 0

  return (
    <Box>
      {isLoading
        ? <Stack>
          {new Array(MAX_DISPLAY_REVIEWS).fill('').map((_item, index) => (
            <Skeleton key={index} h={'120px'} mb={3} isLoaded={false} />
          ))}
        </Stack>
        : <>
          <HStack>
            <Text fontWeight={800} fontSize={['lg', 'xl']} mb={2}>評論</Text>
            {displayReviews.length > 3 && <Link isExternal href={`https://www.themoviedb.org/movie/${id}/reviews?language=zh-TW`}>
              <Button mt={4} variant={'outline'}>查看全部評論</Button>
            </Link>}
          </HStack>
          {hasReviews
            ? <>
              <Flex flexDirection={'column'} gap={3}>
                {displayReviews.map((review) => (
                  <Card key={review.id} bg={cardBackground} boxShadow={'md'} border={cardBorder}>
                    <CardBody py={2} px={4}>
                      <CardHeader as={HStack} p={3} pl={0}>
                        <Avatar
                          as={Link}
                          name={review.author}
                          borderRadius='full'
                          boxSize={'50px'}
                          src={`${PEOPLE_IMAGE_URL_X1}${review.author_details.avatar_path}`}
                          isExternal
                          href={getReviewerUrl(review.author)}
                        />
                        <VStack alignItems={'flex-start'} gap={1}>
                          <HStack>
                            <Heading fontSize={['md', 'lg']}>
                              來自&ensp;
                              <Link textDecoration={'underline'} isExternal href={getReviewerUrl(review.author)}>{review.author}</Link>
                            &ensp;的評論</Heading>
                            <Tag>評分：{review.author_details.rating}</Tag>
                          </HStack>
                          <Text>{dayjs(review.created_at).format('YYYY/MM/DD')}</Text>
                        </VStack>
                      </CardHeader>
                      <Text>{traditionalized(review.content)}</Text>
                    </CardBody>
                  </Card>
                ))}
              </Flex>

            </>
            : <Text>目前尚無評論</Text>
            }
        </>
        }
    </Box>
  )
}

import { Heading, type HeadingProps } from '@chakra-ui/react'

export function PageTitle (props: HeadingProps) {
  return (
    <Heading fontSize={'xl'} {...props}>{props.children}</Heading>
  )
}

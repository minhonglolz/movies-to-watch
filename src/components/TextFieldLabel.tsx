import { Text, type TextProps } from '@chakra-ui/react'

type Props = TextProps & {
  value: string,
}
export function TextFieldLabel ({ value, ...props }: Props) {
  return (
    <Text fontWeight="600" mb={1} {...props}>{value}</Text>
  )
}

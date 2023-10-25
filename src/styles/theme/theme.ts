import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { config } from './config'

export const theme = extendTheme({
  fonts: {
    body: '\'Mulish\' , sans-serif',
    heading: '\'Mulish\' , sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 24,
      },
    },
  },
  colors,
  config,
})

import { IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export function ThemeToggle () {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      background="none"
    />
  )
}

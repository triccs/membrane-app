import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { fonts, fontSizes, fontWeights } from './fonts'
import { colors } from './colors'
import { components } from './components'

const global = {
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#060011',
        color: '#E2D8D',
      },
    },
  },
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

extendTheme()

const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'primary' }), {
  config,
  styles: { global },
  colors,
  fonts,
  fontSizes,
  fontWeights,
  components,
})

export default theme

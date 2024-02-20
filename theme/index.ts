import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { fonts, fontSizes, fontWeights } from './fonts'
import { colors } from './colors'
import { components } from './components'

const global = {
  'html, body': {
    bg: '#05071B',
    // background: "radial-gradient(66.3% 66.3% at 72.54% 59.91%, rgba(17, 16, 21, 0.00) 0%, rgba(17, 16, 21, 0.00) 42%, #111015 100%)",
    color: '#E2D8D',
  },
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: { global },
  colors,
  fonts,
  fontSizes,
  fontWeights,
  components,
})
// const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'primary' }), {
//   config,
//   styles: { global },
//   colors,
//   fonts,
//   fontSizes,
//   fontWeights,
//   components,
// })

export default theme

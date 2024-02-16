import type { DeepPartial, Theme } from '@chakra-ui/react'

/** extend additional color here */
export const colors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  primary: {
    '100': '#B3E9FF',
    '200': '#00A3F9',
    '300': '#0079D6',
    '400': '#005EB2',
    '500': '#004998',
    '600': '#003D7C',
    '700': '#003061',
    '800': '#002345',
    '900': '#00182A',
  },
}

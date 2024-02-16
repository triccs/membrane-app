import type { DeepPartial, Theme } from '@chakra-ui/react'

export const fonts: DeepPartial<Theme['fonts']> = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
  mono: 'Spline Sans, sans-serif',
}

export const fontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '24px',
}
export const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
}

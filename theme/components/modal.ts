import type { ComponentStyleConfig } from '@chakra-ui/react'

export const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      // backgroundImage: "url('/assets/texture.svg')",
      bg: '#05071B',
      // color: '#E2D8D',
      // borderRadius: '0.5rem',
      // padding: '1.5rem',
      // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '24px',
      border: '2px solid rgba(250, 129, 253, 0.37)',
      background: 'rgba(5, 7, 27, 0.75)',
      boxShadow: '0px 0px 24px 0px rgba(250, 129, 253, 0.32)',
      backdropFilter: 'blur(6px)',
      padding: '6',
    },
    overlay: {
      backdropFilter: 'blur(10px)',
    },
  },
}

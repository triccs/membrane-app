import { Box, Center, Container, Fade, HStack, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, PropsWithChildren, useMemo } from 'react'
import Logo from './Logo'
import SideNav from './SideNav'

type Props = PropsWithChildren & {}

const backgroundImageConfig: Record<string, string> = {
  '/': '/images/backgrounds/home_bg.svg',
  '/mint': '/images/backgrounds/mint_bg.svg',
  '/lockdrop': '/images/backgrounds/default_bg.svg',
  '/stake': '/images/backgrounds/default_bg.svg',
  '/bid': '/images/backgrounds/bid_bg.svg',
}

const getBackgroundImage = (asPath: string) => {
  let defaultBackground = '/images/backgrounds/default_bg.svg'
  const backgroundImage = backgroundImageConfig[asPath] || defaultBackground
  return `url(${backgroundImage})`
}

const Mobile = () => (
  <Center h="90vh" p={10} flexDir="column" display={['flex', 'none']} gap={10}>
    <Logo />
    <Text fontSize="xl" textAlign="center" variant="label">
      Mobile support <br /> coming soon
    </Text>
  </Center>
)

const Layout = ({ children }: Props) => {
  return children
}

export default Layout

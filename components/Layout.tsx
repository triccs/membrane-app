import { Center, Container, Fade, HStack, Stack, Text } from '@chakra-ui/react'
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
  const { asPath } = useRouter()

  const backgroundImage = useMemo(() => {
    return getBackgroundImage(asPath)
  }, [asPath])

  return (
    <Fragment>
      <Container
        // background="radial-gradient(66.3% 66.3% at 72.54% 59.91%, rgba(17, 16, 21, 0.00) 0%, rgba(17, 16, 21, 0.00) 42%, #111015 100%)"
        bg="#05071B"
        as="main"
        // h="100vh"
        w="100vw"
        backgroundImage={backgroundImage}
        backgroundSize="contain"
        // backgroundPosition="center"
        // backgroundAttachment="fixed"
        // p="10"
        display={['none', 'flex']}
        minW="1300px"
        h="100vh"
        position="relative"
        backgroundRepeat="no-repeat"
        p="6"
      >
        <SideNav />
        <Stack px="6" pt={3} pb={10} w="full" h="full" overflowY="auto">
          {children}
        </Stack>
      </Container>
      <Mobile />
    </Fragment>
  )
}

export default Layout

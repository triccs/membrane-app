import { Center, Fade, HStack, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, PropsWithChildren, useMemo } from 'react'
import Logo from './Logo'
import SideNav from './SideNav'

type Props = PropsWithChildren & {}

const backgroundImageConfig: Record<string, string> = {
  '/mint': '/images/mint.jpg',
  '/lockdrop': '/images/background.jpg',
  '/stake': '/images/background.jpg',
  '/bid': '/images/background.jpg',
}

const getBackgroundImage = (asPath: string) => {
  let defaultBackground = '/images/background.jpg'
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
      <Fade in={true}>
        <HStack
          as="main"
          h="100vh"
          w="100vw"
          backgroundImage={backgroundImage}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundAttachment="fixed"
          p="10"
          display={['none', 'flex']}
        >
          <SideNav />
          <Stack px="6" pt={3} pb={10} w="full" h="full" overflowY="auto">
            {children}
          </Stack>
        </HStack>
      </Fade>
      <Mobile />
    </Fragment>
  )
}

export default Layout

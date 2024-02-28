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
  const { asPath } = useRouter()

  const backgroundImage = useMemo(() => {
    return getBackgroundImage(asPath)
  }, [asPath])

  return (
    <HStack
      gap={6}
      m={0}
      display={['none', 'flex']}
      h="100vh"
      overflowX="hidden"
      ml="20vw"
      bg="#05071B"
      backgroundImage={backgroundImage}
      backgroundSize="contain"
      position="relative"
      backgroundRepeat="no-repeat"
      p="2"
      overflowY="hidden"
    >
      <SideNav />
      <Stack
        as="main"
        p={4}
        w="1280px"
        ml="300px"
        alignItems="flex-start"
        h="full"
        mt="10"
        flexGrow={1}
      >
        {children}
      </Stack>
    </HStack>

    // <Fragment>
    //   <Container
    //     // background="radial-gradient(66.3% 66.3% at 72.54% 59.91%, rgba(17, 16, 21, 0.00) 0%, rgba(17, 16, 21, 0.00) 42%, #111015 100%)"
    //     bg="#05071B"
    //     as="main"
    //     // h="100vh"
    //     // w="100vw"
    //     backgroundImage={backgroundImage}
    //     backgroundSize="contain"
    //     // backgroundPosition="center"
    //     // backgroundAttachment="fixed"
    //     // p="10"
    //     display={['none', 'flex']}
    //     // minW="1300px"
    //     w="1280px"
    //     maxW="1280px"
    //     h="910px"
    //     position="relative"
    //     backgroundRepeat="no-repeat"
    //     p="6"
    //     // boxShadow="0px 0px 138px 92px rgba(5,7,27,0.93)"
    //     boxShadow="inset 0px 0px 36px 16px rgba(5,7,27,0.36)"
    //   >
    //     <SideNav />
    //     <Stack
    //       px="6"
    //       pt={3}
    //       pb={10}
    //       w="full"
    //       h="full"
    //       overflowY="auto"
    //       css={{
    //         // Customize scrollbar appearance
    //         // '::-webkit-scrollbar': {
    //         //   // width: '0px', // Hide horizontal scrollbar
    //         //   // height: '0px', // Hide vertical scrollbar
    //         //   position: 'absolute',
    //         // },

    //         '::-webkit-scrollbar': {
    //           width: '12px', // Set width of the scrollbar
    //         },
    //         '::-webkit-scrollbar-thumb': {
    //           backgroundColor: 'red', // Set color of the scrollbar thumb to red
    //           borderRadius: '6px', // Set border radius of the scrollbar thumb
    //         },
    //       }}
    //     >
    //       {children}
    //     </Stack>
    //   </Container>
    //   <Mobile />
    // </Fragment>
  )
}

export default Layout

import { Box, Center, Container, Fade, HStack, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment, PropsWithChildren, useMemo } from 'react'
import Logo from './Logo'
import SideNav from './SideNav'
import RPCStatus from './RPCStatus'

type Props = PropsWithChildren & {
  isScrollable?: boolean
}

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

const Page = ({ isScrollable = true, children }: Props) => {
  const { asPath } = useRouter()

  const backgroundImage = useMemo(() => {
    return getBackgroundImage(asPath)
  }, [asPath])

  return (
    <HStack
      gap={6}
      m={0}
      display={['none', 'flex']}
      h="910px"
      overflowX="hidden"
      ml="20vw"
      bg="#05071B"
      backgroundImage={backgroundImage}
      backgroundSize="contain"
      position="relative"
      backgroundRepeat="no-repeat"
      p="2"
      overflowY={isScrollable ? 'auto' : 'hidden'}
      width={isScrollable ? '100%' : '1280px'}
    >
      <SideNav />
      <Stack
        as="main"
        p={4}
        w="1280px"
        maxW="1280px"
        ml="300px"
        alignItems="flex-start"
        h="910px"
        mt="10"
        flexGrow={1}
      >
        <RPCStatus />
        {children}
      </Stack>
    </HStack>
  )
}

export default Page

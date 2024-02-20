import { num } from '@/helpers/num'
import {
  Box,
  Card,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import CurrentPositions from './CurrentPositions'
import { Summary } from './Summary'
import TakeAction from './TakeAction'
import useComboBalance from './hooks/useComboBalance'
import useMintState from './hooks/useMintState'
import { useCurrentPosition } from './hooks/useCurrentPosition'
import useVaultSummary from './hooks/useVaultSummary'
import { motion } from 'framer-motion'
import useMint from './hooks/useMint'
import Page from '../Page'

const CustomeTab = ({ label }: { label: string }) => (
  <Tab zIndex={1} _selected={{ color: 'white' }}>
    {label}
  </Tab>
)

const Mint = () => {
  const { setMintState, mintState } = useMintState()
  const comboBalance = useComboBalance()

  const mint = useMint()

  useEffect(() => {
    const assets = comboBalance
      ?.filter((balace) => num(balace.comboUsdValue || 0).isGreaterThan(1))
      .map((balance) => ({
        ...balance,
        sliderValue: 0,
      }))

    setMintState({ assets })
  }, [comboBalance])

  const onTabChange = (index: number) => {
    setMintState({ isTakeAction: index === 1 })
  }

  // const getPercent = (value: number) => {
  //   switch (true) {
  //     case value < 5:
  //       return value * 2.55
  //     case value > 5 && value < 10:
  //       return value * 2.53
  //     case value > 10 && value < 25:
  //       return value * 1.51
  //       // default:
  //       return 0
  //   }
  // }

  const percent = useMemo(() => {
    const value = num(mintState.ltvSlider).isLessThan(5)
      ? num(mintState.ltvSlider).times(2.6)
      : num(mintState.ltvSlider).plus(15)
    // const value = getPercent(mintState.ltvSlider || 0)
    return num(value).times(335).div(100).toNumber()
  }, [mintState.ltvSlider])

  return (
    <Page isScrollable={false}>
      <Stack w="full" h="full" justifyContent="center">
        <Card w="380px" gap="12" h="max-content" px="2">
          <VStack w="full" gap="5">
            <Text variant="title" fontSize="24px">
              Mint
            </Text>

            <Tabs
              position="relative"
              variant="unstyled"
              align="center"
              w="full"
              onChange={onTabChange}
            >
              <TabList bg="white" borderRadius="28px" color="black" w="fit-content">
                <CustomeTab label="Current Position" />
                <CustomeTab label="Take Action" />
              </TabList>

              <TabIndicator
                top="0"
                position="absolute"
                height="40px"
                bg="#C445F0"
                borderRadius="28px"
              />
              <TabPanels mt="5">
                <CurrentPositions />
                <TakeAction />
              </TabPanels>
            </Tabs>
          </VStack>
        </Card>
        <Box position="absolute" left="889px" top="391px" zIndex={2} transform="scale(0.85)">
          <Image src="/images/beaker_lines.svg" />
        </Box>
        <motion.div
          style={{
            position: 'absolute',
            left: 770,
            top: 710,
            // maxHeight: 335,
            maxHeight: `${percent}px`,
            transform: 'scale(0.85) rotate(180deg)',
            height: percent,
            overflow: 'hidden',
            transformOrigin: 'top',
          }}
          initial={{ height: 0 }}
          animate={{ height: percent }}
          transition={{ type: 'spring', stiffness: 1000 }}
        >
          <Image src="/images/beaker_liquid.svg" transform="rotate(180deg)" />
        </motion.div>
        {/* <Text>
        {mintState.ltvSlider}-{percent}
      </Text> */}
        {/* <Summary /> */}
      </Stack>
    </Page>
  )
}

export default Mint

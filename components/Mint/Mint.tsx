import { num } from '@/helpers/num'
import {
  Box,
  Card,
  Image,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import Page from '../Page'
import CurrentPositions from './CurrentPositions'
import { Summary } from './Summary'
import useCombinBalance from './hooks/useCombinBalance'
import useMintState from './hooks/useMintState'
import useVaultSummary from './hooks/useVaultSummary'
import { calcuateMintAndRepay, setInitialMintState } from '@/helpers/mint'
import TakeAction from './TakeAction'

const CustomeTab = ({ label }: { label: string }) => (
  <Tab zIndex={1} _selected={{ color: 'white' }}>
    {label}
  </Tab>
)

const Mint = () => {
  const { setMintState, mintState } = useMintState()
  const combinBalance = useCombinBalance()
  const { ltv, borrowLTV, originalLTV = 0, originalTVL = 0, tvl, debtAmount } = useVaultSummary()

  useEffect(() => {
    // need to set initial state when combin balance is ready
    setInitialMintState({ combinBalance, ltv, borrowLTV, setMintState })
  }, [combinBalance])

  useEffect(() => {
    // need to recalculate mint and repay when ltv or borrowLTV changes
    const ltvSlider = num(ltv).times(100).dividedBy(borrowLTV).toNumber()

    const { mint, repay } = calcuateMintAndRepay(
      ltvSlider,
      originalLTV,
      originalTVL,
      borrowLTV,
      tvl,
      debtAmount,
    )
    setMintState({ ltvSlider, mint, repay })
  }, [ltv, borrowLTV])

  const onTabChange = (index: number) => {
    setMintState({ isTakeAction: index === 1 })
  }

  const percent = useMemo(() => {
    const ltvSlider = mintState?.ltvSlider || 0
    const value = num(ltvSlider).isLessThan(5) ? num(ltvSlider).times(2.6) : num(ltvSlider)
    return num(value).times(336).div(100).toNumber()
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
                <CustomeTab label="Position info" />
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
        {isNaN(percent) ? null : (
          <motion.div
            style={{
              position: 'absolute',
              left: 770,
              top: 710,
              maxHeight: percent,
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
        )}
      </Stack>
    </Page>
  )
}

export default Mint

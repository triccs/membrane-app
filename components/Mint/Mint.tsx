import { num } from '@/helpers/num'
import {
  Card,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import CurrentPositions from './CurrentPositions'
import { Summary } from './Summary'
import TakeAction from './TakeAction'
import useComboBalance from './hooks/useComboBalance'
import useMintState from './hooks/useMintState'

const CustomeTab = ({ label }: { label: string }) => (
  <Tab zIndex={1} _selected={{ color: 'white' }}>
    {label}
  </Tab>
)

const Mint = () => {
  const { setMintState } = useMintState()
  const comboBalance = useComboBalance()

  useEffect(() => {
    const assets = comboBalance
      ?.filter((balace) => num(balace.comboUsdValue || 0).isGreaterThan(1))
      .map((balance) => ({
        ...balance,
        sliderValue: 0,
      }))

    setMintState({ assets })
  }, [comboBalance])

  return (
    <Stack justifyContent="center" h="full" direction="row">
      <Card w="380px" alignItems="center" gap="12" h="max-content">
        <VStack w="full" gap="5">
          <Text variant="title" fontSize="24px">
            Mint
          </Text>

          <Tabs position="relative" variant="unstyled" align="center" w="full">
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
      <Summary />
    </Stack>
  )
}

export default Mint

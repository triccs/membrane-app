import {
  Card,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import useVaultSummary from './hooks/useVaultSummary'

type Props = {}

const useMintStats = () => {
  return [
    {
      label: 'DEBT',
      value: '239 CDT',
    },
    {
      label: 'LTV',
      value: '82.1%',
    },
    {
      label: 'COST',
      value: '0.0028%',
    },
    {
      label: 'BORROWABLE LTV',
      value: '88%',
    },
    {
      label: 'LIQ. VALUE',
      value: '$254',
    },
    {
      label: 'LIQUIDATION LTV',
      value: '0.94%%',
    },
    {
      label: 'LIQUIDATION LTV',
      value: '$290',
    },
  ]
}

const useMyVaults = () => {
  return [
    {
      label: 'ATOM',
      value: '12212.788($239)',
    },
    {
      label: 'OSMO',
      value: '$82.1',
    },
    {
      label: 'TIA',
      value: '$0.002',
    },
    {
      label: 'LTV',
      value: '$88',
    },
  ]
}

const Mint = (props: Props) => {
  const stats = useMintStats()
  const myVaults = useMyVaults()

  // const summary = useVaultSummary()

  const [atom, setAtom] = React.useState(30)

  return (
    <Stack justifyContent="center" h="full">
      <Card w="380px" alignItems="center" gap="12" h="490px">
        <VStack w="full" gap="5">
          <Text variant="title" fontSize="24px">
            Mint
          </Text>

          <Tabs position="relative" variant="unstyled" align="center" w="full">
            <TabList bg="white" borderRadius="28px" color="black" w="fit-content">
              <Tab zIndex={1} _selected={{ color: 'white' }}>
                Current Position
              </Tab>
              <Tab zIndex={1} _selected={{ color: 'white' }}>
                Take Action
              </Tab>
            </TabList>

            <TabIndicator
              top="0"
              position="absolute"
              height="40px"
              bg="#C445F0"
              borderRadius="28px"
            />
            <TabPanels mt="5">
              <TabPanel>
                <Stack gap="5">
                  {stats.map(({ label, value }) => (
                    <HStack key={label + value} justifyContent="space-between">
                      <Text variant="lable">{label}</Text>
                      <Text variant="value">{value}</Text>
                    </HStack>
                  ))}
                </Stack>
              </TabPanel>

              <TabPanel>
                <Stack gap="5">
                  {myVaults.map(({ label, value }) => (
                    <Stack key={label + value} gap="0">
                      <HStack justifyContent="space-between">
                        <Text variant="lable">{label}</Text>
                        <HStack>
                          <Text variant="value">{label === 'ATOM' ? atom : value}</Text>
                          <Text variant="value" color="primary.200">
                            {label === 'ATOM' ? `($${(atom * 10.2).toFixed(2)})` : value}
                          </Text>
                        </HStack>
                      </HStack>

                      <Slider
                        aria-label="slider-ex-4"
                        defaultValue={atom}
                        min={0}
                        max={400}
                        onChange={(v) => setAtom(v)}
                      >
                        <SliderTrack bg="#E2D8DA" h="2" borderRadius="80px">
                          <SliderFilledTrack bg="#C445F0" />
                        </SliderTrack>
                        <SliderThumb
                          boxSize={6}
                          bg="#C445F0"
                          cursor="grab"
                          border="2px solid #E2D8DA"
                        />
                      </Slider>
                    </Stack>
                  ))}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Card>
    </Stack>
  )
}

export default Mint

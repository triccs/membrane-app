import { TabPanel, Stack, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useCurrentPosition } from './hooks/useCurrentPosition'

const CurrentPositions = () => {
  const stats = useCurrentPosition()

  return (
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
  )
}

export default CurrentPositions
import { num } from '@/helpers/num'
import { Box, Card, HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import useMintState from './hooks/useMintState'
import { TxButton } from '../TxButton'

type SummaryItemProps = {
  label: string
  value: string
  usdValue: string
}

const SummaryItem = ({ label, value, usdValue }: SummaryItemProps) => (
  <HStack
    key={label}
    justifyContent="space-between"
    pb="1"
    my="2"
    borderBottom="1px solid"
    borderColor="whiteAlpha.200"
  >
    <Text variant="value" textTransform="unset">
      {label}
    </Text>
    <HStack>
      <Text>{value}</Text>
      <Text color="primary.200">${usdValue}</Text>
    </HStack>
  </HStack>
)

export const Summary = () => {
  const { mintState } = useMintState()
  const { summary, totalUsdValue } = mintState

  if (!mintState.isTakeAction || !summary?.length) return null

  return (
    <Card h="max-content" overflow="auto" w="400px" zIndex="5">
      <Text variant="title" fontSize="24px">
        Summary
      </Text>

      {summary?.map(({ label, value, usdValue }) => {
        return <SummaryItem key={label} label={label} value={value} usdValue={usdValue} />
      })}

      <SummaryItem label="Total" value="" usdValue={totalUsdValue?.toFixed(2) || '0'} />

      <Box mt="5" w="auto" alignSelf="center" minW="50%">
        <TxButton isDisabled>Mint</TxButton>
      </Box>
    </Card>
  )
}

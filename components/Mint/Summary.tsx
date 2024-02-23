import { num } from '@/helpers/num'
import { Badge, Box, Card, HStack, Text } from '@chakra-ui/react'
import { TxButton } from '../TxButton'
import useMintState from './hooks/useMintState'

type SummaryItemProps = {
  label: string
  value: string
  usdValue: string
  showBadge?: boolean
}

const SummaryItem = ({ label, value, usdValue, showBadge = true }: SummaryItemProps) => (
  <HStack
    key={label}
    justifyContent="space-between"
    pb="1"
    my="2"
    borderBottom="1px solid"
    borderColor="whiteAlpha.200"
  >
    <HStack>
      <Text variant="value" textTransform="unset">
        {label}
      </Text>
      {num(usdValue).isGreaterThan(0) && showBadge && (
        <Badge fontSize="10px" colorScheme="green">
          Deposit
        </Badge>
      )}
      {num(usdValue).isLessThan(0) && showBadge && (
        <Badge fontSize="10px" colorScheme="red">
          Withdraw
        </Badge>
      )}
    </HStack>
    <HStack>
      <Text>{num(value).abs().toString()}</Text>
      {/* <Text color="primary.200">${usdValue}</Text> */}
    </HStack>
  </HStack>
)

export const Summary = () => {
  const { mintState } = useMintState()
  const { summary } = mintState

  if (!mintState.isTakeAction) return null

  return (
    <Card h="max-content" overflow="auto" w="400px" zIndex="5">
      <Text variant="title" fontSize="24px">
        Summary
      </Text>

      {summary?.map(({ label, value, usdValue }) => {
        return <SummaryItem key={label} label={label} value={value} usdValue={usdValue} />
      })}
      {num(mintState.mint).isGreaterThan(0) && (
        <SummaryItem
          showBadge={false}
          label="Mint CDT"
          value={mintState.mint?.toFixed(2) || '0'}
          usdValue={mintState.mint?.toFixed(2) || '0'}
        />
      )}
      {num(mintState.repay).isGreaterThan(0) && (
        <SummaryItem
          showBadge={false}
          label="Repay CDT"
          value={mintState.repay?.toFixed(2) || '0'}
          usdValue={mintState.repay?.toFixed(2) || '0'}
        />
      )}

      <Box mt="5" w="auto" alignSelf="center" minW="50%">
        <TxButton isDisabled>Mint</TxButton>
      </Box>
    </Card>
  )
}

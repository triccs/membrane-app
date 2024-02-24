import { num } from '@/helpers/num'
import { Badge, HStack, Image, Stack, Text } from '@chakra-ui/react'
import useMintState from './hooks/useMintState'
import { Asset } from '@/helpers/chain'
import { AssetWithBalance } from './hooks/useCombinBalance'
import { useAssetBySymbol } from '@/hooks/useAssets'
import useMint from './hooks/useMint'

type SummaryItemProps = AssetWithBalance & {
  label: string
  value: string
  usdValue: string
  showBadge?: boolean
  badge?: string
  logo?: string
}

const SummaryItem = ({
  label,
  value,
  usdValue,
  badge,
  showBadge = true,
  logo,
}: SummaryItemProps) => (
  <HStack
    key={label}
    justifyContent="space-between"
    pb="1"
    my="1"
    borderBottom="1px solid"
    borderColor="whiteAlpha.200"
  >
    <HStack>
      <HStack>
        <Image src={logo} w="20px" h="20px" />
        <Text variant="value" textTransform="unset">
          {label}
        </Text>
      </HStack>

      {showBadge && (
        <Badge fontSize="10px" colorScheme="green">
          {badge}
        </Badge>
      )}
    </HStack>
    <HStack>
      <Text>{num(value).abs().toString()}</Text>
    </HStack>
  </HStack>
)

export const Summary = () => {
  const { mintState } = useMintState()
  const { summary } = mintState
  const cdt = useAssetBySymbol('CDT')

  if (!mintState.isTakeAction) return null

  return (
    <Stack h="max-content" overflow="auto" w="full">
      {summary?.map((asset) => {
        const badge = num(asset.value).isGreaterThan(0) ? 'Deposit' : 'Withdraw'
        return <SummaryItem key={asset?.label} {...asset} badge={badge} />
      })}
      {num(mintState.mint).isGreaterThan(0) && (
        <SummaryItem
          label="CDT"
          badge="Mint"
          value={mintState.mint?.toFixed(2) || '0'}
          usdValue={mintState.mint?.toFixed(2) || '0'}
          logo={cdt?.logo}
        />
      )}
      {num(mintState.repay).isGreaterThan(0) && (
        <SummaryItem
          badge="Repay"
          label="CDT"
          value={mintState.repay?.toFixed(2) || '0'}
          usdValue={mintState.repay?.toFixed(2) || '0'}
          logo={cdt?.logo}
        />
      )}

      {/* <Box mt="5" w="auto" alignSelf="center" minW="50%">
        <TxButton isDisabled>Mint</TxButton>
      </Box> */}
    </Stack>
  )
}

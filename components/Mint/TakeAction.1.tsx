import { num } from '@/helpers/num'
import { Box, Divider, Stack, TabPanel } from '@chakra-ui/react'
import { AssetWithSlider } from './AssetWithSlider'
import useCombinBalance, { AssetWithBalance } from './hooks/useCombinBalance'
import useMintState from './hooks/useMintState'
import useVaultSummary from './hooks/useVaultSummary'
import { getSummary, setInitialMintState } from '@/helpers/mint'
import ActionButtons from './ActionButtons'
import useMint from './hooks/useMint'
import TxError from '@/components/TxError'

export const TakeAction = () => {
  const { mintState, setMintState } = useMintState()
  const combinBalance = useCombinBalance()
  const mint = useMint()

  const {
    tvl,
    borrowLTV,
    originalBorrowLTV,
    originalLTV,
    originalTVL = 0,
    debtAmount,
  } = useVaultSummary()

  const sliderChange = (value: number, symbol: string) => {
    const updatedAssets = mintState.assets.map((asset) => {
      const sliderValue = asset.symbol === symbol ? value : asset.sliderValue
      const amount = num(sliderValue)
        .times(asset.combinUsdValue)
        .dividedBy(100)
        .dividedBy(asset.price)
        .toFixed(6)
      const amountValue = num(amount).times(asset.price).toNumber()
      return {
        ...asset,
        amount,
        amountValue,
        sliderValue,
      }
    })

    const { summary, totalUsdValue } = getSummary(updatedAssets)
    setMintState({ assets: updatedAssets, summary, totalUsdValue })
  }

  const CollateralAssets = ({ assets = [] }: { assets: AssetWithBalance[] }) => {
    return (
      <Stack
        gap="5"
        maxH="75vh"
        overflowY="auto"
        w="full"
        px="3"
        css={{
          // Customize scrollbar appearance
          '::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: 'transparent', // Set background color of the scrollbar to transparent
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#05071B',
            borderRadius: '6px', // Set border radius of the scrollbar thumb
          },
        }}
      >
        {mintState?.assets?.map((asset) => {
          return (
            <AssetWithSlider
              key={asset?.base}
              label={asset?.symbol}
              value={asset.amount}
              sliderValue={asset.sliderValue}
              onChange={(v: number) => sliderChange(v, asset?.symbol)}
            />
          )
        })}
      </Stack>
    )
  }

  const totalsliderChange = (ltvSlider: number) => {
    const originalLtvAmount = num(originalLTV).times(originalTVL).dividedBy(100).toNumber()
    const maxLtv = num(borrowLTV).times(tvl).dividedBy(100).toNumber()
    const newLtv = num(ltvSlider).times(maxLtv).dividedBy(100).toNumber()
    const diff = num(originalLtvAmount).minus(newLtv).abs().toNumber()
    const repay = num(newLtv).isLessThan(originalLtvAmount) ? diff : 0
    const mint = num(originalLtvAmount).isLessThan(newLtv) ? diff : 0

    setMintState({ ltvSlider, mint, repay })
  }

  const onRest = () => {
    setInitialMintState({
      combinBalance,
      ltv: originalLTV,
      borrowLTV: originalBorrowLTV,
      setMintState,
    })
  }

  return (
    <TabPanel>
      <CollateralAssets assets={mintState?.assets} />

      <Divider
        bg="rgba(226, 216, 218, 0.24)"
        boxShadow="0px 0px 8px 0px rgba(226, 216, 218, 0.64)"
        w="calc(100% - 16px)"
        h="1px"
        my="5"
        mx="3"
      />

      <Box px="3">
        <AssetWithSlider
          label="Mintable LTV"
          value={num(debtAmount)
            .plus(mintState?.mint || 0)
            .minus(mintState.repay || 0)
            .toFixed(2)}
          sliderValue={mintState?.ltvSlider}
          onChange={totalsliderChange}
        />
      </Box>

      <ActionButtons onRest={onRest} />
      <TxError isError={mint?.simulate.isError} errorMessage={mint?.simulate.errorMessage} />
    </TabPanel>
  )
}

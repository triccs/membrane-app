import { getSummary } from '@/helpers/mint'
import { num } from '@/helpers/num'
import { Stack } from '@chakra-ui/react'
import { AssetWithSlider } from './AssetWithSlider'
import useMintState from './hooks/useMintState'

const CollateralAssets = () => {
  const { mintState, setMintState } = useMintState()
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
          width: '6px', // Set width of the scrollbar
          backgroundColor: 'transparent', // Set background color of the scrollbar to transparent
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#05071B', // Set color of the scrollbar thumb to blue
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

export default CollateralAssets

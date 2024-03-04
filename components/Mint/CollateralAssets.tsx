import { getSummary } from '@/helpers/mint'
import { num } from '@/helpers/num'
import { Stack } from '@chakra-ui/react'
import { AssetWithSlider } from './AssetWithSlider'
import useMintState from './hooks/useMintState'
import useCombinBalance from './hooks/useCombinBalance'
import { useEffect } from 'react'

const CollateralAssets = () => {
  const { mintState, setMintState } = useMintState()
  const combinBalance = useCombinBalance()
  const { assets } = mintState

  const sliderChange = (value: number, symbol: string) => {
    // const updatedAssets = mintState.assets.map((asset) => {
    //   const sliderValue = asset.symbol === symbol ? value : asset.sliderValue
    //   const amount = num(sliderValue)
    //     .times(asset.combinUsdValue)
    //     .dividedBy(100)
    //     .dividedBy(asset.price)
    //     .toFixed(6)
    //   const amountValue = num(amount).times(asset.price).toNumber()
    //   return {
    //     ...asset,
    //     amount,
    //     amountValue,
    //     sliderValue,
    //   }
    // })
    // const { summary, totalUsdValue } = getSummary(updatedAssets)
    // console.log({
    //   assets: updatedAssets,
    //   summary,
    //   totalUsdValue,
    // })
    // setMintState({ assets: updatedAssets, summary, totalUsdValue })
  }

  useEffect(() => {
    const assetsWithValuesGreaterThanZero = combinBalance
      ?.filter((asset) => {
        return num(asset.combinUsdValue || 0).isGreaterThan(0)
      })
      .map((asset) => ({
        ...asset,
        sliderValue: asset.depositUsdValue || 0,
        amount: 0,
        amountValue: 0,
      }))

    setMintState({ assets: assetsWithValuesGreaterThanZero })
  }, [combinBalance])

  return (
    <Stack
      gap="5"
      maxH="75vh"
      overflowY="auto"
      w="full"
      px="4"
      py="2"
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
      {assets?.map((asset) => {
        return (
          <AssetWithSlider
            key={asset?.base}
            asset={asset}
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

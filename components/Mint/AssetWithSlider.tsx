import { HStack, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { SliderWithState } from './SliderWithState'
import { AssetWithBalance } from './hooks/useCombinBalance'
import useMintState from './hooks/useMintState'
import { getSummary } from '@/helpers/mint'
import { num } from '@/helpers/num'
import { calculateVaultSummary } from '@/services/cdp'
import { useBasket, useBasketPositions, useCollateralInterest } from '@/hooks/useCDP'
import { useOraclePrice } from '@/hooks/useOracle'

export type AssetWithSliderProps = {
  label: string
  value?: number | string
  usdValue?: number
  sliderValue?: number
  onChange: (value: number) => void
  asset: AssetWithBalance
}

export const AssetWithSlider = ({
  asset,
  label,
  // value,
  // sliderValue = 0,
  // onChange,
}: AssetWithSliderProps) => {
  // const [_sliderValue, setSliderValue] = useState<number>(asset?.depositUsdValue || 0)
  const { mintState, setMintState } = useMintState()

  const { data: basket } = useBasket()
  const { data: collateralInterest } = useCollateralInterest()
  const { data: basketPositions } = useBasketPositions()
  const { data: prices } = useOraclePrice()

  const onChange = (value: number) => {
    const isAdding = value > asset.sliderValue!

    let updatedAssets = mintState.assets.map((asset) => {
      // 1. check if currentLTV is greater than borrowLTV
      // 2. if it is, then set overdraft to true and calculate value to max that asset can be withdrawn
      // 3. if it is not, then set overdraft to false

      // compare with previous value and calculate the difference

      const sliderValue = asset.symbol === label ? value : asset.sliderValue || 0
      const diffInUsd = num(asset.depositUsdValue).minus(sliderValue).dp(2).toNumber()
      const newDepoist = num(asset.depositUsdValue).minus(diffInUsd).dp(2).toNumber()
      const amountValue = num(diffInUsd).isGreaterThanOrEqualTo(asset.depositUsdValue)
        ? newDepoist
        : -diffInUsd
      const amount = num(amountValue).dividedBy(asset.price).dp(6).toNumber()
      return {
        ...asset,
        amount,
        amountValue,
        sliderValue,
      }
    })

    const { summary, totalUsdValue } = getSummary(updatedAssets)
    let overdraft = false

    const { ltv, borrowLTV, tvl } = calculateVaultSummary({
      basket,
      collateralInterest,
      basketPositions,
      prices,
      newDeposit: totalUsdValue || 0,
      summary: summary,
    })

    console.log({
      isOverdraft: ltv > borrowLTV,
      isAdding,
      ltv,
      borrowLTV,
    })

    if (ltv > borrowLTV && !isAdding) {
      overdraft = true
      const restOfAssets = updatedAssets.filter((asset) => asset.symbol !== label)
      const restValue = restOfAssets.reduce((acc, asset) => acc + asset.sliderValue, 0)
      const ltvValue = num(ltv).times(tvl).dividedBy(100).toNumber()
      const assetValue = ltvValue - restValue

      console.log({
        restOfAssets,
        restValue,
        ltvValue,
        assetValue,
      })

      const newUpdatedAssets = updatedAssets.map((a) => {
        if (a.base === asset.base) {
          const newSliderValue = assetValue
          let diffInUsd = num(asset.depositUsdValue).minus(newSliderValue).dp(2).toNumber()
          if (diffInUsd < 0) {
            diffInUsd = 0
          }
          const newDepoist = num(asset.depositUsdValue).minus(diffInUsd).dp(2).toNumber()
          const amountValue = num(diffInUsd).isGreaterThanOrEqualTo(asset.depositUsdValue)
            ? newDepoist
            : -diffInUsd
          const amount = num(amountValue).dividedBy(asset.price).dp(6).toNumber()

          return {
            ...a,
            amount,
            amountValue,
            sliderValue: num(newSliderValue).dp(2).toNumber(),
          }
        }
        return a
      })

      const { summary, totalUsdValue } = getSummary(newUpdatedAssets)
      setMintState({ assets: newUpdatedAssets, summary, totalUsdValue, overdraft })
      return
    }

    setMintState({ assets: updatedAssets, summary, totalUsdValue, overdraft })
    // setSliderValue(value)
  }

  return (
    <Stack gap="0">
      <HStack justifyContent="space-between">
        <Text variant="lable" textTransform="unset">
          {label}
        </Text>
        <HStack>
          <Text variant="value">${asset?.sliderValue?.toFixed(2)}</Text>
        </HStack>
      </HStack>
      <SliderWithState
        value={asset?.sliderValue}
        onChange={onChange}
        min={0}
        max={asset?.combinUsdValue}
      />
    </Stack>
  )
}

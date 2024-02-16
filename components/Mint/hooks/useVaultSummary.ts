import {
  Basket,
  BasketPositionsResponse,
  CollateralInterestResponse,
} from '@/contracts/codegen/positions/Positions.types'
import { shiftDigits } from '@/helpers/math'
import { num } from '@/helpers/num'
import { useBasket, useBasketPositions, useCollateralInterest } from '@/hooks/useCDP'
import { useMemo } from 'react'

const getDebt = (basketPositions: BasketPositionsResponse[] | undefined) => {
  if (!basketPositions) return 0
  const debt = basketPositions?.[0]?.positions?.[0]?.credit_amount
  return shiftDigits(debt, -6).toNumber()
}

const getTVL = (positions: Positions, prices: Prices) => {
  const assets: string[] = Object.keys(positions)
  let tvl = num(0)

  assets.forEach((asset: string) => {
    const assetAmout = num(positions[asset])
    const assetPrice = num(prices[asset])
    tvl = tvl.plus(assetAmout.times(assetPrice))
  })

  return tvl.toNumber()
}

const getPositions = (basketPositions: BasketPositionsResponse[] | undefined) => {
  if (!basketPositions) return {}
  const positions: Positions = {}
  basketPositions?.[0]?.positions?.[0]?.collateral_assets.forEach((asset) => {
    const denom = asset.asset.info.native_token.denom
    positions[denom] = shiftDigits(asset.asset.amount, -6).toNumber()
  })
  return positions
}

interface Positions {
  [key: string]: number
}

interface Prices {
  [key: string]: number
}

interface AssetRatio {
  [key: string]: number
}

const getAssetRatio = (tvl: number, positions: Positions, prices: Prices): AssetRatio => {
  const assets: string[] = Object.keys(positions)
  const assetRatio: AssetRatio = {}

  const calculateRatio = (asset: string): number => {
    return num(positions[asset]).times(prices[asset]).div(tvl).toNumber()
  }

  assets.forEach((asset: string) => {
    if (num(tvl).isZero()) assetRatio[asset] = 0
    else assetRatio[asset] = calculateRatio(asset)
  })

  return assetRatio
}

const getAsseInterestRate = (
  asset: string,
  collateralInterest: CollateralInterestResponse,
  basket: Basket,
) => {
  const rateIndex = basket?.collateral_types.findIndex(
    ({ asset }) => asset.info.native_token.denom === asset,
  )
  return rateIndex !== -1 ? collateralInterest?.rates[rateIndex] || 0 : null
}

const getRataCost = (
  positions: Positions,
  collateralInterest: CollateralInterestResponse,
  basket: Basket,
) => {
  const assets = Object.keys(positions)
  const prices = {}
  assets.forEach((asset) => {
    return {
      [asset]: getAsseInterestRate(asset, collateralInterest, basket),
    }
  })
  const tvl = getTVL(positions, prices)
  const ratios = getAssetRatio(tvl, positions, prices)
  console.log({
    tvl,
    ratios,
    prices,
  })
  let cost = num(0)
  assets.forEach((asset) => {
    const rateIndex = basket?.collateral_types.findIndex(
      ({ asset }) => asset.info.native_token.denom === asset,
    )
    if (rateIndex !== -1) {
      const assetRate = collateralInterest?.rates[rateIndex]
      //   cost += parseFloat((parseFloat(assetRate) * ratios[asset]).toFixed(4))
      cost = cost.plus(num(assetRate).times(ratios[asset]))
    }
  })
}

const positions = {
  osmo: 0,
  atom: 0,
  axlusdc: 0,
  usdc: 0,
  stAtom: 0,
  stOsmo: 0,
  tia: 0,
  usdt: 0,
  atomosmo_pool: 0,
  osmousdc_pool: 0,
}

const useVaultSummary = () => {
  const { data: basket } = useBasket()
  const { data: collateralInterest } = useCollateralInterest()
  const { data: basketPositions } = useBasketPositions()
  const reteCost = getRataCost(positions, collateralInterest!, basket!)

  return useMemo(() => {
    const debt = getDebt(basketPositions)
    return {
      debt,
      reteCost,
      //   assetRate,
    }
  }, [basketPositions])

  // parseInt(userRes[0].positions[0].credit_amount);
}

export default useVaultSummary

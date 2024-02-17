import contracts from '@/config/contracts.json'
import { PositionsQueryClient } from '@/contracts/codegen/positions/Positions.client'
import { Addr, Basket, BasketPositionsResponse, CollateralInterestResponse } from '@/contracts/codegen/positions/Positions.types'
import { Asset, getAssetByDenom, getChainAssets } from '@/helpers/chain'
import getCosmWasmClient from '@/helpers/comswasmClient'
import { shiftDigits } from '@/helpers/math'
import { Price } from './oracle'
import { num } from '@/helpers/num'

export const cdpClient = async () => {
  const cosmWasmClient = await getCosmWasmClient()
  return new PositionsQueryClient(cosmWasmClient, contracts.cdp)
}


export const getBasket = async () => {
  const client = await cdpClient()
  return client.getBasket()
}

const getAsseInterestRate = (
  denom: string | undefined,
  collateralInterest: CollateralInterestResponse,
  basket: Basket,
) => {
  if (!denom || !collateralInterest || !basket) return null
  const rateIndex = basket?.collateral_types.findIndex(
    ({ asset }) => asset.info.native_token.denom === denom,
  )
  return rateIndex !== -1 ? collateralInterest?.rates[rateIndex] || 0 : null
}

export type BasketAsset = {
  asset: Asset
  interestRate: number
  rateIndex: number
  maxLTV: number
  maxBorrowLTV: number

}
export const getBasketAssets =  (baseket : Basket, collateralInterest: CollateralInterestResponse) => {
  const chainAssets = getChainAssets()

  return baseket?.collateral_types.map((asset) => {
    const denom = asset.asset?.info.native_token?.denom
    let assetInfo = chainAssets?.find((chainAsset) => chainAsset.base === denom)

    if(!assetInfo) {
      assetInfo = {
        base: denom
      }
    }

    const interestRate = getAsseInterestRate(assetInfo?.base, collateralInterest, baseket)
    const rateIndex = Number(asset.rate_index)
    const maxLTV = Number(asset.max_LTV)
    const maxBorrowLTV = Number(asset.max_borrow_LTV)
    
    return {
      asset: assetInfo,
      interestRate,
      rateIndex,
      maxLTV,
      maxBorrowLTV
    }
  }) as BasketAsset[]
}

export const getCollateralInterest = async () => {
  const client = await cdpClient()
  return client.getCollateralInterest()
}

export const getCreditRate = async () => {
  const client = await cdpClient()
  return client.getCreditRate()
}

export const getBasketPositions = async (address: Addr) => {
  const client = await cdpClient()
  return client.getBasketPositions({
    user: address,
  })
}

export const getDebt = (basketPositions: BasketPositionsResponse[] | undefined) => {
  if (!basketPositions) return 0
  const debt = basketPositions?.[0]?.positions?.[0]?.credit_amount
  return shiftDigits(debt, -6).toNumber()
}

export interface Positions {
  [key: string]: number
}

export const getTVL = (positions: Positions[]) => {
  if (!positions) return 0
  return positions?.reduce((acc, position) => {
    return acc + position.usdValue
  }, 0)
}

export interface Prices {
  [key: string]: number
}

export const getPositions = (basketPositions?: BasketPositionsResponse[], prices?: Price[]) => {
  if (!basketPositions) return []
  const positions = basketPositions?.[0]?.positions?.[0]

  return positions?.collateral_assets.map((asset) => {
    const denom = asset.asset.info.native_token.denom
    const assetInfo = getAssetByDenom(denom) || { denom }
    const amount = shiftDigits(asset.asset.amount, -6).toNumber()
    const assetPrice = prices?.find((price) => price.denom === denom)?.price || 0

    const usdValue = num(amount).times(assetPrice).toNumber()
    return {
      ...assetInfo,
      denom,
      amount,
      usdValue,
    }
  }) as Positions[]
}

export const getAssetRatio = (tvl: number, positions: Positions[]) => {
  return positions.map((position) => ({
    ...position,
    ratio: num(position.usdValue).div(tvl).toNumber(),
  }))
}

export const getRateCost = (
  positions: Positions[],
  tvl: number,
  basketAssets: BasketAsset[] = [],
): number => {
  const positionsWithRatio = getAssetRatio(tvl, positions)
  const cost = positionsWithRatio.reduce((acc, position) => {
    const rate =
      basketAssets.find((asset) => asset?.asset?.base === position.denom)?.interestRate || 0
    return acc.plus(num(position.ratio).times(rate))
  }, num(0))

  return cost.toNumber()
}


export type LiquidationLTV = {
  tvl: number
  debtAmount: number
  mintAmount?: number
  repayAmount?: number
  creditPrice: number
}
export const getLquidationLTV = ({
  tvl,
  debtAmount,
  mintAmount = 0,
  repayAmount = 0,
  creditPrice,
}: LiquidationLTV) => {
  return num(debtAmount)
    .plus(mintAmount)
    .minus(repayAmount)
    .times(creditPrice)
    .div(tvl)
    .times(100)
    .toNumber()
}

export type LiquidValue = {
  ltv: number
  debtAmount: number
  mintAmount: number
  repayAmount: number
  creditPrice: number
}

export const getLiquidValue = ({ ltv, debtAmount, mintAmount, repayAmount, creditPrice }: LiquidValue) => {
  return num(debtAmount)
    .plus(mintAmount)
    .minus(repayAmount)
    .times(creditPrice)
    .div(ltv / 100)
    .toNumber()
}

export type MaxMint = {
  tvl: number
  basketAssets: BasketAsset[]
  positions: Positions[]
  creditPrice: number
  debtAmount: number
}

export const getLTV = (tvl: number, positions: Positions[], basketAssets: BasketAsset[] = []) => {
  const positionsWithRatio = getAssetRatio(tvl, positions)

  const maxLTV = positionsWithRatio.reduce((acc, position) => {
    const ltv = basketAssets.find((asset) => asset?.asset?.base === position.denom)?.maxLTV || 0
    return acc.plus(num(position.ratio).times(100).times(ltv))
  }, num(0))

  const maxBorrowLTV = positionsWithRatio.reduce((acc, position) => {
    const ltv =
      basketAssets.find((asset) => asset?.asset?.base === position.denom)?.maxBorrowLTV || 0
    return acc.plus(num(position.ratio).times(100).times(ltv))
  }, num(0))

  return {
    maxLTV: maxLTV.toNumber(),
    maxBorrowLTV: maxBorrowLTV.toNumber(),
  }
}

export const maxMintAmount = ({ tvl, basketAssets, positions, creditPrice, debtAmount }: MaxMint) => {
  const { maxLTV } = getLTV(tvl, positions, basketAssets)

  const creditPriceAdjusted = Math.max(creditPrice, 1)

  return num(tvl)
    .times(maxLTV / 100)
    .div(creditPriceAdjusted)
    .minus(debtAmount)
    .dp(6)
    .toNumber()
}

type VaultSummary = {
  basket?: Basket
  collateralInterest?: CollateralInterestResponse
  basketPositions?: BasketPositionsResponse[]
  prices?: Price[]
}

export const calculateVaultSummary = ({
  basket,
  collateralInterest,
  basketPositions,
  prices,
}: VaultSummary) => {

  if(!basket || !collateralInterest || !basketPositions || !prices) {
    return {
      debtAmount: 0,
      cost: 0,
      tvl: 0,
      ltv: {
        maxLTV: 0,
        maxBorrowLTV: 0,
      },
      liquidValue: 0,
      liqudationLTV: 0
    }
  }
    const positions = getPositions(basketPositions, prices)
    const debtAmount = getDebt(basketPositions)
    const basketAssets = getBasketAssets(basket!, collateralInterest!)
    const tvl = getTVL(positions)
    const cost = getRateCost(positions, tvl, basketAssets)
    const ltv = getLTV(tvl, positions, basketAssets)
    const creditPrice = Number(basket?.credit_price.price) || 1

    const mintAmount = maxMintAmount({
      tvl,
      basketAssets,
      positions,
      creditPrice,
      debtAmount,
    })

    const liquidValue = getLiquidValue({
      ltv: ltv.maxLTV,
      debtAmount,
      mintAmount,
      repayAmount: 0,
      creditPrice,
    })

    const liqudationLTV = getLquidationLTV({
      tvl,
      debtAmount,
      mintAmount,
      creditPrice,
    })

    return {
      debtAmount,
      cost,
      tvl,
      ltv,
      liquidValue,
      liqudationLTV,
    }
}
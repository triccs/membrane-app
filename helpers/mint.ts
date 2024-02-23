import { AssetWithBalance } from '@/components/Mint/hooks/useCombinBalance'
import { num } from './num'

const getDeposited = (deposited = 0, newDeposit: string) => {
  const diff = num(newDeposit).minus(deposited).dp(6).toNumber()
  return diff !== 0 ? diff : 0
}

const calculateNewDeposit = (sliderValue: number, combinUsdValue: number, price: number) => {
  return num(sliderValue).times(combinUsdValue).dividedBy(100).dividedBy(price).toFixed(6)
}

export const getSummary = (assets: AssetWithBalance[]) => {
  const summary = assets
    ?.map((asset) => {
      const newDepositWillBe = calculateNewDeposit(
        asset.sliderValue || 0,
        asset.combinUsdValue,
        asset.price,
      )
      const value = getDeposited(asset.deposited, newDepositWillBe)
      return {
        label: asset.symbol,
        value,
        usdValue: num(value).times(asset.price).toFixed(2),
        currentDeposit: asset.deposited,
        newDepositWillBe,
      }
    })
    .filter((asset) => num(asset.value).dp(5).abs().isGreaterThan(0))
    .sort((a) => (num(a.value).isNegative() ? 1 : -1))

  const totalUsdValue = summary?.reduce((acc, asset) => {
    return acc + num(asset.usdValue).toNumber()
  }, 0)

  return { summary, totalUsdValue }
}

export const calcuateMintAndRepay = (
  sliderValue: number,
  originalLTV: number,
  originalTVL: number,
  borrowLTV: number,
  tvl: number,
  debtAmount: number,
) => {
  const originalLtvAmount = num(originalLTV).times(originalTVL).dividedBy(100).dp(2).toNumber()
  const maxLtvAmount = num(borrowLTV).times(tvl).dividedBy(100).dp(2).toNumber()
  const newLtvAmount = num(sliderValue).times(maxLtvAmount).dividedBy(100).dp(2).toNumber()
  const diff = num(originalLtvAmount).minus(newLtvAmount).abs().dp(2).toNumber()
  let repay = num(newLtvAmount).isLessThan(originalLtvAmount) ? diff : 0
  let mint = num(originalLtvAmount).isLessThan(newLtvAmount) ? diff : 0

  if (maxLtvAmount < debtAmount) {
    repay = num(debtAmount).minus(maxLtvAmount).dp(2).toNumber()
    mint = 0
  } else {
    mint = 0
    repay = 0
  }

  return {
    mint,
    repay,
  }
}

export const setInitialMintState = ({
  combinBalance,
  ltv,
  borrowLTV,
  setMintState,
}: {
  combinBalance: any
  ltv: any
  borrowLTV: any
  setMintState: any
}) => {
  const assets = combinBalance
    ?.filter((balance) => num(balance.combinUsdValue || 0).isGreaterThan(0))
    .map((balance) => {
      const sliderValue = num(balance.deposited)
        .dividedBy(balance.combinBalance)
        .times(100)
        .toNumber()
      const amount = num(sliderValue)
        .times(balance.combinUsdValue)
        .dividedBy(100)
        .dividedBy(balance.price)
        .toFixed(sliderValue === 0 ? 2 : 6)
      const amountValue = num(amount).times(balance.price).toNumber()

      return {
        ...balance,
        amount,
        amountValue,
        sliderValue,
      }
    })

  const ltvSlider = num(ltv).times(100).dividedBy(borrowLTV).toNumber()

  setMintState({ assets, ltvSlider, mint: 0, repay: 0, summary: [], totalUsdValue: 0 })
}

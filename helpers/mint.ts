import { AssetWithBalance } from '@/components/Mint/hooks/useCombinBalance'
import { num } from './num'
import { Summary } from '@/components/Mint/hooks/useMintState'
import { PositionsMsgComposer } from '@/contracts/codegen/positions/Positions.message-composer'
import contracts from '@/config/contracts.json'
import { Asset } from '@/contracts/codegen/positions/Positions.types'
import { Coin, coin } from '@cosmjs/stargate'
import { shiftDigits } from './math'
import { getAssetBySymbol } from './chain'

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
        ...asset,
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
  let overdraft = false

  if (maxLtvAmount < debtAmount) {
    repay = num(debtAmount).minus(maxLtvAmount).dp(2).toNumber()
    mint = 0
  } else {
    mint = 0
    repay = 0
  }

  // if maxLtvAmount is less than debtAmount, then set overdraft to true
  if (num(maxLtvAmount).isLessThan(debtAmount)) overdraft = true

  console.log({
    mint,
    repay,
    overdraft,
    maxLtvAmount,
    debtAmount,
  })

  return {
    mint,
    repay,
    overdraft,
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

type GetDepostAndWithdrawMsgs = {
  summary?: Summary[]
  address: string
  positionId: string
}

const getAsset = (asset: any): Asset => {
  return {
    amount: shiftDigits(Math.abs(asset.value), 6).dp(0).toString(),
    info: {
      native_token: {
        denom: asset.base,
      },
    },
  }
}

export const getDepostAndWithdrawMsgs = ({
  summary,
  address,
  positionId,
}: GetDepostAndWithdrawMsgs) => {
  const messageComposer = new PositionsMsgComposer(address, contracts.cdp)

  const deposit: Summary[] = []
  const withdraw: Summary[] = []
  const msgs = []

  summary?.forEach((asset) => {
    if (num(asset.value).isGreaterThan(0)) {
      deposit.push(asset)
    } else {
      withdraw.push(asset)
    }
  })

  // user_coins.sort((a, b) => a.denom < b.denom ? -1 : 1,);

  const depositFunds = deposit
    .sort((a, b) => (a.base < b.base ? -1 : 1))
    .map((asset) => {
      const amount = shiftDigits(asset.value, 6).dp(0).toString()
      return coin(amount, asset.base)
    })

  if (depositFunds.length > 0) {
    const depositMsg = messageComposer.deposit({ positionId, positionOwner: address }, depositFunds)
    msgs.push(depositMsg)
  }

  if (withdraw.length > 0) {
    const withdrawMsg = messageComposer.withdraw({
      positionId,
      assets: withdraw?.map((asset) => getAsset(asset)),
    })
    msgs.push(withdrawMsg)
  }

  return msgs
}

type GetMintAndRepayMsgs = {
  mintAmount?: string | number
  repayAmount?: string | number
  address: string
  positionId: string
}
export const getMintAndRepayMsgs = ({
  address,
  positionId,
  mintAmount = '0',
  repayAmount = '0',
}: GetMintAndRepayMsgs) => {
  const messageComposer = new PositionsMsgComposer(address, contracts.cdp)
  const msgs = []

  if (num(mintAmount).isGreaterThan(0)) {
    const mintMsg = messageComposer.increaseDebt({
      positionId,
      amount: shiftDigits(mintAmount, 6).dp(0).toString(),
    })
    msgs.push(mintMsg)
  }

  if (num(repayAmount).isGreaterThan(0)) {
    const cdt = getAssetBySymbol('CDT')
    const microAmount = shiftDigits(repayAmount, 6).dp(0).toString()
    const funds = [coin(microAmount, cdt?.base!)]
    const repayMsg = messageComposer.repay({ positionId }, funds)
    msgs.push(repayMsg)
  }

  return msgs
}

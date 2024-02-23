import { useEffect } from 'react'
import useCombinBalance from './useCombinBalance'
import useMintState from './useMintState'
import { num } from '@/helpers/num'

// loop through summary then dedeuct the summary walletBalance
const getDepositAssets = (summary: any, combinBalance: any) => {
  return summary?.map((s: any) => {
    const asset = combinBalance.find((a: any) => a.label === s.symbol)
    const deposit = num(s.value).minus(asset?.walletsdValue).toString()
    return {
      ...s,
      deposit,
    }
  })
}

const useMint = () => {
  const combinBalance = useCombinBalance()
  const { mintState } = useMintState()
  const { summary } = mintState

  const depositAssets = getDepositAssets(summary, combinBalance)

  useEffect(() => {}, [combinBalance, summary])
}

export default useMint

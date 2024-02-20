import { useEffect } from 'react'
import useComboBalance from './useComboBalance'
import useMintState from './useMintState'
import { num } from '@/helpers/num'

// loop through summary then dedeuct the summary walletBalance
const getDepositAssets = (summary: any, comboBalance: any) => {
  return summary?.map((s: any) => {
    const asset = comboBalance.find((a: any) => a.label === s.symbol)
    const deposit = num(s.value).minus(asset?.walletsdValue).toString()
    return {
      ...s,
      deposit,
    }
  })
}

const useMint = () => {
  const comboBalance = useComboBalance()
  const { mintState } = useMintState()
  const { summary } = mintState

  const depositAssets = getDepositAssets(summary, comboBalance)

  useEffect(() => {
    // console.log({
    //   comboBalance,
    //   summary,
    //   depositAssets,
    // })
  }, [comboBalance, summary])
}

export default useMint

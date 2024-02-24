import { useEffect } from 'react'
import useCombinBalance from './useCombinBalance'
import useMintState from './useMintState'
import { num } from '@/helpers/num'
import { getDepostAndWithdrawMsgs, getMintAndRepayMsgs } from '@/helpers/mint'
import useWallet from '@/hooks/useWallet'
import { decodeMsgs } from '@/helpers/decodeMsg'
import { useBasketPositions } from '@/hooks/useCDP'
import { useQuery } from '@tanstack/react-query'
import useSimulate from '@/hooks/useSimulate'
import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate'
import useTransaction from '@/hooks/useTransaction'

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
  const { address } = useWallet()
  const { data: basketPositions } = useBasketPositions()
  const positionId = basketPositions?.[0]?.positions?.[0]?.position_id

  const { data: msgs } = useQuery<MsgExecuteContractEncodeObject[] | null>({
    queryKey: [
      'mint',
      address,
      positionId,
      summary?.map((s: any) => String(s.value)) || '0',
      mintState?.mint,
      mintState?.repay,
    ],
    queryFn: () => {
      const depositAndWithdraw = getDepostAndWithdrawMsgs({ summary, address, positionId })
      const mintAndRepay = getMintAndRepayMsgs({
        address,
        positionId,
        mintAmount: mintState?.mint,
        repayAmount: mintState?.repay,
      })
      return [...depositAndWithdraw, ...mintAndRepay]
    },
    enabled: !!address && !!positionId,
  })

  const simulate = useSimulate({
    msgs,
    amount: '1',
    queryKey: [
      String(mintState?.mint) || '0',
      String(mintState?.repay) || '0',
      summary?.map((s: any) => String(s.value)) || '0',
    ],
  })

  const tx = useTransaction({
    msgs,
    fee: simulate.data?.[0] || [],
  })

  return {
    simulate,
    tx,
  }
}

export default useMint

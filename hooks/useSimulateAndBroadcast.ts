import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate'
import useSimulate from './useSimulate'
import useTransaction from './useTransaction'

type SimulateAndBroadcast = {
  simulate: ReturnType<typeof useSimulate>
  tx: ReturnType<typeof useTransaction>
}

type Props = {
  msgs?: MsgExecuteContractEncodeObject[]
  queryKey: string[]
  enabled?: boolean
  amount?: string
}

const useSimulateAndBroadcast = ({ msgs, queryKey, amount }: Props): SimulateAndBroadcast => {
  const simulate = useSimulate({
    msgs,
    amount,
    queryKey,
  })

  const [fee] = simulate.data || []

  const tx = useTransaction({
    msgs,
    fee,
  })

  return {
    simulate,
    tx,
  }
}

export default useSimulateAndBroadcast

import { StdFee } from '@cosmjs/stargate'
import useBaseAsset from './useBaseAsset'
import { useMemo } from 'react'
import { shiftDigits } from '@/helpers/math'

const useGasAndFee = (fee: StdFee | undefined) => {
  const baseAsset = useBaseAsset()
  const gas = fee?.gas?.toString() || '0'
  const amount = fee?.amount?.[0]?.amount?.toString() || '0'

  return useMemo(() => {
    const decimals = baseAsset?.decimals || 6
    return {
      gas: shiftDigits(gas, -decimals).toString(),
      fee: shiftDigits(amount, -decimals).toString(),
    }
  }, [fee, baseAsset, amount])
}

export default useGasAndFee

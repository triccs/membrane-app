import { useChain } from '@cosmos-kit/react'

const useWallet = () => {
  return useChain('osmosis')
}

export default useWallet

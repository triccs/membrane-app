import { rpcUrl } from '@/config/defaults'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

const getCosmWasmClient = () => {
  return CosmWasmClient.connect(rpcUrl)
}

export default getCosmWasmClient

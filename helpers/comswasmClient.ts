import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

// const rpcUrl = 'https://g.w.lavanet.xyz:443/gateway/cos3/rpc-http/bb6d2019c50124ec4fdb78498bc50573'
const rpcUrl = 'https://rpc.margined.io'

const getCosmWasmClient = () => {
  return CosmWasmClient.connect(rpcUrl)
}

export default getCosmWasmClient

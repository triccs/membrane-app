import contracts from '@/config/contracts.json'
import { VestingQueryClient } from '@/contracts/codegen/vesting/Vesting.client'
import { Addr } from '@/contracts/generated/positions/Positions.types'
import getCosmWasmClient from '@/helpers/comswasmClient'

export const vestingClient = async () => {
  const cosmWasmClient = await getCosmWasmClient()
  return new VestingQueryClient(cosmWasmClient, contracts.vesting)
}

export const getAllocation = async (address: Addr) => {
  const client = await vestingClient()
  return client.allocation({
    recipient: address,
  })
}

export const getUnlocked = async (address: Addr) => {
  const client = await vestingClient()
  return client.unlockedTokens({
    recipient: address,
  })
}

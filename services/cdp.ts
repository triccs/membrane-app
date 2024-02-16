import contracts from '@/config/contracts.json'
import { PositionsQueryClient } from '@/contracts/codegen/positions/Positions.client'
import { Addr } from '@/contracts/codegen/positions/Positions.types'
import getCosmWasmClient from '@/helpers/comswasmClient'

export const cdpClient = async () => {
  const cosmWasmClient = await getCosmWasmClient()
  return new PositionsQueryClient(cosmWasmClient, contracts.cdp)
}

export const getBasket = async () => {
  const client = await cdpClient()
  return client.getBasket()
}

export const getCollateralInterest = async () => {
  const client = await cdpClient()
  return client.getCollateralInterest()
}

export const getCreditRate = async () => {
  const client = await cdpClient()
  return client.getCreditRate()
}

export const getBasketPositions = async (address: Addr) => {
  const client = await cdpClient()
  return client.getBasketPositions({
    user: address,
  })
}

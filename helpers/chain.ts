import { assets as registryAssets } from 'chain-registry'
import { Asset as RegistryAsset } from '@chain-registry/types'
import { getExponentByDenom } from '@chain-registry/utils'

export type Asset = RegistryAsset & {
  decimal: number
  logo: string
}

const defaultChain = 'osmosis'
const supportedAssets = ['OSMO', 'ATOM', 'TIA', 'CDT', 'MBRN', 'stOSMO', 'stATOM', 'USDT', 'USDC']

export const getAssetLogo = (asset: RegistryAsset) => {
  return asset?.logo_URIs?.svg || asset?.logo_URIs?.png || asset?.logo_URIs?.jpeg
}

export const getAssets = () => {
  const chainAssets = registryAssets.find((asset) => asset.chain_name === defaultChain)
  const supportedChainAssets = chainAssets?.assets.filter((asset) =>
    supportedAssets.includes(asset.symbol),
  )
  return supportedChainAssets?.map((asset) => ({
    ...asset,
    decimal: getExponentByDenom(registryAssets, asset.base, defaultChain),
    logo: getAssetLogo(asset),
  }))
}

export const getAssetBySymbol = (symbol: string) => {
  const assets = getAssets()
  return assets?.find((asset) => asset.symbol === symbol)
}

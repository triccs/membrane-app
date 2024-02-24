import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import Layout from '@/components/Layout'

import { SignerOptions } from '@cosmos-kit/core'
import { ChainProvider } from '@cosmos-kit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { assets, chains } from 'chain-registry'
import { GasPrice } from 'cosmwasm'

import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation'
import { wallets as keplrWallets } from '@cosmos-kit/keplr'
// import { wallets as snapWallet } from "@cosmos-kit/leap-metamask-cosmos-snap";
import { wallets as leapWallets } from '@cosmos-kit/leap'
import { wallets as ledgerWallets } from '@cosmos-kit/ledger'
import { wallets as shellWallets } from '@cosmos-kit/shell'
import { wallets as stationWallets } from '@cosmos-kit/station'

import { Chain } from '@chain-registry/types'
// import { SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate'
import '@interchain-ui/react/styles'
import { aminoTypes, registry } from '@/config/defaults'
import WalletModal from '@/components/WalletModal'
import { useEffect, useState } from 'react'

const signerOptions: SignerOptions = {
  signingStargate: () => {
    return {
      aminoTypes,
      registry,
      gasPrice: GasPrice.fromString('0.0075uosmo'),
    }
  },
  signingCosmwasm: (chain: Chain) => {
    switch (chain.chain_name) {
      case 'osmosis':
      case 'osmosistestnet5':
        return {
          gasPrice: GasPrice.fromString('0.0075uosmo'),
        }
    }
  },
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      staleTime: 300000, // 300 seconds
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ChainProvider
          chains={chains}
          assetLists={assets}
          wallets={[
            ...keplrWallets,
            ...cosmostationWallets,
            // ...xdefiWallets,
            ...leapWallets?.slice(0, 2),
          ]}
          walletModal={WalletModal}
          signerOptions={signerOptions}
          endpointOptions={{
            isLazy: true,
            endpoints: {
              // 'osmosistestnet5': {
              //   rpc: ["https://rpc.margined.io"],
              // }
              osmosis: {
                rpc: [
                  'https://g.w.lavanet.xyz:443/gateway/cos3/rpc-http/bb6d2019c50124ec4fdb78498bc50573',
                  // 'https://rpc.margined.io',
                ],
              },
            },
          }}
        >
          <Component {...pageProps} />
        </ChainProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App

import LockedAccess from '@/components/LockedAccess'
import Mint from '@/components/Mint'
import Page from '@/components/Page'
import useWallet from '@/hooks/useWallet'

const MintPage = () => {
  const { isWalletConnected } = useWallet()

  if (!isWalletConnected) return <LockedAccess />

  return (
    <Page isScrollable={false}>
      <Mint />
    </Page>
  )
}

export default MintPage

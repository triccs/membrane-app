import { Center, SimpleGrid } from '@chakra-ui/react'
import { BidIcon, ClaimIcon, MintIcon, StakeIcon } from '../Icons'
import FeatureCard from './FeatureCard'
import Page from '../Page'

const featurs = [
  {
    label: 'Vaults',
    FeatureIcon: MintIcon,
    href: '/mint',
    ctaLabel: 'Mint',
  },
  {
    label: 'Liquications',
    FeatureIcon: BidIcon,
    href: '/bid',
    ctaLabel: 'Bid',
  },
  {
    label: 'Governance',
    FeatureIcon: StakeIcon,
    href: '/governance',
    ctaLabel: 'Stake',
  },
  {
    label: 'Lockdrop',
    FeatureIcon: ClaimIcon,
    href: '/lockdrop',
    ctaLabel: 'Claim',
  },
]

const Home = () => {
  return (
    <Page isScrollable={false}>
      <Center h="full">
        <SimpleGrid columns={2} spacing={5} width="648px" ml="82px" mt="143px">
          {featurs.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </SimpleGrid>
      </Center>
    </Page>
  )
}

export default Home

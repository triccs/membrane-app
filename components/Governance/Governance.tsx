import { HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import Claim from './Claim'
import Stake from './Stake'
import Unstake from './Unstake'
import TokenAllocation from './TokenAllocation'

const Governance = () => {
  return (
    <Stack>
      <SimpleGrid columns={2} gap="5" h="265px">
        <Stake />
        <Unstake />
        <Claim />
        <TokenAllocation />
      </SimpleGrid>
    </Stack>
  )
}

export default Governance

import { HStack, Stack } from '@chakra-ui/react'
import Claim from './Claim'
import Stake from './Stake'
import Unstake from './Unstake'

const Governance = () => {
  return (
    <Stack>
      <HStack gap="5" h="265px">
        <Stake />
        <Unstake />
        <Claim />
      </HStack>
    </Stack>
  )
}

export default Governance

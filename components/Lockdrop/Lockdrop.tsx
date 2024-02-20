import { HStack, Stack } from '@chakra-ui/react'
import Info from './Info'
import LoackdropPane from './LockdropPane'
import LockChart from './LockChart'
import { useIncentives, useRanking, useUserInfo } from './hooks/useLockdrop'
import Page from '../Page'

const Lockdrop = () => {
  // const { data: incentives } = useIncentives()
  // const { data: distribution } = useRanking()
  // const userInfo = useUserInfo()

  return (
    <Page>
      <HStack gap="5" justifyContent="space-around" alignItems="flex-start">
        {/* <Card>
        <Text>Lockdrop</Text>
        <Text> Allocation : {incentives?.amount} MBM</Text>
        <Text>{incentives?.message}</Text>
        <Text>
          Rank: {distribution?.userRanking} / {distribution?.totalRanking}
        </Text>
        <Button isDisabled={!incentives?.hasParticipated}>Claim</Button>
      </Card> */}

        <Stack w="full" gap="5">
          <Info />
          <LockChart />
        </Stack>

        <Stack w="full">
          <LoackdropPane />
        </Stack>
      </HStack>
    </Page>
  )
}

export default Lockdrop

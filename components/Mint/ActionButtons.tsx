import { HStack, Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { GrPowerReset } from 'react-icons/gr'
import ConfirmModal from '@/components/ConfirmModal'
import { Summary } from './Summary'
import useMint from './hooks/useMint'
import TxError from '@/components/TxError'

type Props = {
  onRest: () => void
}

const ActionButtons = ({ onRest }: Props) => {
  const mint = useMint()

  console.log({
    mint,
  })

  return (
    <HStack mt="5" gap="4">
      <ConfirmModal label="Open" action={mint}>
        <Stack>
          <Summary />
          <TxError action={mint} />
        </Stack>
      </ConfirmModal>
      <Button variant="ghost" leftIcon={<GrPowerReset />} onClick={onRest}>
        Reset
      </Button>
    </HStack>
  )
}

export default ActionButtons

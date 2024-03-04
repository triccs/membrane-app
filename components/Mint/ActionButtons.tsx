import { HStack, Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { GrPowerReset } from 'react-icons/gr'
import ConfirmModal from '@/components/ConfirmModal'
import { Summary } from './Summary'
import useMint from './hooks/useMint'
import TxError from '@/components/TxError'
import useMintState from './hooks/useMintState'

type Props = {
  onRest: () => void
}

const ActionButtons = ({ onRest }: Props) => {
  const mint = useMint()
  const { mintState } = useMintState()

  return (
    <HStack mt="5" gap="4">
      <ConfirmModal label="Open" action={mint}>
        <Summary />
        <TxError action={mint} />
      </ConfirmModal>
      <Button variant="ghost" leftIcon={<GrPowerReset />} onClick={onRest}>
        Reset
      </Button>
    </HStack>
  )
}

export default ActionButtons

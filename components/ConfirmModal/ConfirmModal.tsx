import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Stack,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { TxButton } from '../TxButton'
import LoaderWithIcon from '../LoaderWithIcon'
import { Action } from '@/types/tx'
import { LoadingContent } from './LoadingContent'
import ConfrimDetails from './ConfrimDetails'
import { TxDetails } from './TxDetails'

type Props = PropsWithChildren & {
  label: string
  action?: Action
}

const mockSuccess = {
  tx: {
    isSuccess: true,
    data: {
      code: 0,
      gasUsed: 900909,
      transactionHash: '7D8DBC214C1888267A48EEE325EADC6F58D765C3D03D0868D82A3650F3AECB9E',
    },
  },
}

const mockLoading = {
  tx: {
    isSuccess: true,
    data: {
      code: 0,
      gasUsed: 900909,
      transactionHash: '7D8DBC214C1888267A48EEE325EADC6F58D765C3D03D0868D82A3650F3AECB9E',
    },
  },
}

const ConfirmModal = ({ children, label = 'Open', action }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        isLoading={action?.simulate.isLoading || action?.tx.isPending}
        isDisabled={action?.simulate.isError || !action?.simulate.data}
        onClick={onOpen}
      >
        {label}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered size="xl">
        <ModalOverlay />
        <LoadingContent action={action} />
        <ConfrimDetails action={action}>{children}</ConfrimDetails>
        <TxDetails action={action} onClose={onClose} />
      </Modal>
    </>
  )
}

export default ConfirmModal

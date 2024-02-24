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

type Props = PropsWithChildren & {
  label: string
  action?: Action
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
        <ModalContent>
          {/* <Stack w="140px" h="140px" my="16" alignItems="center" w="full">
            <LoaderWithIcon />
            <Text color="white" fontSize="xs" fontWeight="normal">
              Broadcasting
            </Text>
          </Stack> */}
          <ModalHeader>
            <Text variant="title" fontSize="24px">
              Confirm transaction
            </Text>
            <Text color="white" fontSize="xs" fontWeight="normal">
              Please review your transaction.
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>{children}</ModalBody>

          <ModalFooter justifyContent="center">
            <TxButton
              isLoading={action?.simulate.isLoading || action?.tx.isPending}
              isDisabled={action?.simulate.isError || !action?.simulate.data}
              onClick={() => action?.tx.mutate()}
            >
              Confirm
            </TxButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmModal

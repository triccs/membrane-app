import { FC, PropsWithChildren } from 'react'
import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import useWallet from '@/hooks/useWallet'

interface ConnectionButtonProps {
  disabledTooltip?: string
}

export const TxButton: FC<PropsWithChildren<ConnectionButtonProps & ButtonProps>> = ({
  disabledTooltip,
  children,
  ...buttonProps
}) => {
  const { isWalletConnected, connect } = useWallet()

  if (!isWalletConnected) {
    return (
      <Button maxW="200px" onClick={connect}>
        Connect Wallet
      </Button>
    )
  }

  return (
    <Tooltip hasArrow label={buttonProps.isDisabled ? disabledTooltip : ''}>
      <Button {...buttonProps}>{children}</Button>
    </Tooltip>
  )
}

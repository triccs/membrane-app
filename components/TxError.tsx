import React from 'react'
import { Text } from '@chakra-ui/react'

type Props = {
  isError: boolean
  errorMessage: string | null
}

const TxError = ({ isError, errorMessage }: Props) => {
  if (!isError) return null

  return (
    <Text size="xs" color="red">
      {errorMessage}
    </Text>
  )
}

export default TxError

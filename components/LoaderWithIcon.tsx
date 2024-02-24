import { Box, Spinner, Image } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const LoaderWithIcon = (props: Props) => {
  return (
    <Box position="relative">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        width="140px"
        height="140px"
        // position="absolute"
        zIndex={1}
      />
      <Image
        zIndex={2}
        position="absolute"
        height="100px"
        width="100px"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        src="https://app.osmosis.zone/tokens/generated/osmo.svg"
      />
    </Box>
  )
}

export default LoaderWithIcon

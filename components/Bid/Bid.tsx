import { Stack } from '@chakra-ui/react'
import React from 'react'
import PlaceBid from './PlaceBid'
import MyBid from './MyBid'
import Risk from './Risk'

type Props = {}

const Bid = (props: Props) => {
  return (
    <Stack>
      <Risk />
      <PlaceBid />
      <MyBid />
    </Stack>
  )
}

export default Bid

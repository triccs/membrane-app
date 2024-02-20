import { Stack } from '@chakra-ui/react'
import React from 'react'
import PlaceBid from './PlaceBid'
import MyBid from './MyBid'
import Risk from './Risk'
import Page from '../Page'

type Props = {}

const Bid = (props: Props) => {
  return (
    <Page>
      <Stack pb="10">
        <Risk />
        <PlaceBid />
        <MyBid />
        <MyBid />
        <MyBid />
      </Stack>
    </Page>
  )
}

export default Bid

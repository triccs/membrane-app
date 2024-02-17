import Mint from '@/components/Mint'
import { useBasket, useBasketPositions, useCollateralInterest } from '@/hooks/useCDP'
import { useIncentives } from '@/components/Lockdrop/hooks/useLockdrop'
import { useOraclePrice } from '@/hooks/useOracle'
import React from 'react'

type Props = {}

const MintPage = (props: Props) => {
  // const prices = useOraclePrice()
  // const basket = useBasket()
  // const collateralInterest = useCollateralInterest()
  // const positions = useBasketPositions()

  // console.log({
  //   prices,
  //   basket,
  //   collateralInterest,
  //   positions,
  // })

  return <Mint />
}

export default MintPage

import TxError from '@/components/TxError'
import { setInitialMintState } from '@/helpers/mint'
import { num } from '@/helpers/num'
import { Box, Divider, TabPanel, Text } from '@chakra-ui/react'
import ActionButtons from './ActionButtons'
import { AssetWithSlider } from './AssetWithSlider'
import CollateralAssets from './CollateralAssets'
import useCombinBalance from './hooks/useCombinBalance'
import useMint from './hooks/useMint'
import useMintState from './hooks/useMintState'
import useVaultSummary from './hooks/useVaultSummary'
import { LTVWithSlider } from './LTVWithSlider'

const OverDraftMessage = ({ show = false }: { show?: boolean }) => {
  return (
    <Text fontSize="sm" color="red.500" mt="2" minH="21px">
      {show ? 'Withdrawal amount exceeds the maximum LTV.' : ' '}
    </Text>
  )
}

const TakeAction = () => {
  const { mintState, setMintState } = useMintState()
  const combinBalance = useCombinBalance()
  const mint = useMint()

  const {
    tvl,
    borrowLTV,
    originalBorrowLTV,
    originalLTV,
    originalTVL = 0,
    debtAmount,
  } = useVaultSummary()

  console.log({
    tvl,
    borrowLTV,
    originalBorrowLTV,
    originalLTV,
    originalTVL,
    debtAmount,
  })

  const totalsliderChange = (ltvSlider: number) => {
    // const originalLtvAmount = num(originalLTV).times(originalTVL).dividedBy(100).toNumber()
    // const maxLtv = num(borrowLTV).times(tvl).dividedBy(100).toNumber()
    // const newLtv = num(ltvSlider).times(maxLtv).dividedBy(100).toNumber()
    // const diff = num(originalLtvAmount).minus(newLtv).abs().toNumber()
    // const repay = num(newLtv).isLessThan(originalLtvAmount) ? diff : 0
    // const mint = num(originalLtvAmount).isLessThan(newLtv) ? diff : 0
    // let overdraft = false
    // // if maxLtvAmount is less than debtAmount, then set overdraft to true
    // const newDebtAmount = num(debtAmount).minus(repay).toNumber()
    // if (num(maxLtv).isLessThan(newDebtAmount)) overdraft = true
    // setMintState({ ltvSlider, mint, repay, overdraft })
  }

  const onRest = () => {
    setInitialMintState({
      combinBalance,
      ltv: originalLTV,
      borrowLTV: originalBorrowLTV,
      setMintState,
    })
  }

  console.log({
    debtAmount,
  })

  return (
    <TabPanel>
      <CollateralAssets />

      <Divider
        bg="rgba(226, 216, 218, 0.24)"
        boxShadow="0px 0px 8px 0px rgba(226, 216, 218, 0.64)"
        w="calc(100% - 16px)"
        h="1px"
        my="5"
        mx="3"
      />

      <Box px="3">
        <LTVWithSlider
          label="Mintable LTV"
          value={num(debtAmount)
            .plus(mintState?.mint || 0)
            .minus(mintState.repay || 0)
            .dp(2)
            .toNumber()}
          sliderValue={mintState?.ltvSlider}
          onChange={totalsliderChange}
        />
      </Box>

      <ActionButtons onRest={onRest} />
      <OverDraftMessage show={mintState.overdraft} />
      <TxError action={mint} />
    </TabPanel>
  )
}

export default TakeAction

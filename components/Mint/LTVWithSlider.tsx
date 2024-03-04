import { HStack, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AssetWithBalance } from './hooks/useCombinBalance'
import useMintState from './hooks/useMintState'
import { getSummary } from '@/helpers/mint'
import { num } from '@/helpers/num'
import { SliderWithState } from './SliderWithState'
import useVaultSummary from './hooks/useVaultSummary'

export type LTVWithSliderProps = {
  label: string
  value?: number
  usdValue?: number
  sliderValue?: number
  onChange: (value: number) => void
  asset: AssetWithBalance
}

export const LTVWithSlider = ({
  asset,
  label,
  value,
  // sliderValue = 0,
  // onChange,
}: LTVWithSliderProps) => {
  const [sliderValue, setSliderValue] = useState<number>(value || 0)
  const { mintState, setMintState } = useMintState()

  console.log({ sliderValue })

  const {
    tvl,
    borrowLTV,
    originalBorrowLTV,
    originalLTV,
    originalTVL = 0,
    debtAmount,
    mintAmount,
  } = useVaultSummary()

  const max = num(borrowLTV).times(tvl).dividedBy(100).dp(2).toNumber()

  const onChange = (value: number) => {
    const newValue = num(value).dp(2).toNumber()
    const diff = num(debtAmount).minus(newValue).abs().toNumber()
    const mint = num(newValue).isGreaterThan(debtAmount) ? diff : 0
    const repay = num(newValue).isLessThan(debtAmount) ? diff : 0
    setSliderValue(num(value).dp(2).toNumber())
    setMintState({ mint, repay })
  }

  return (
    <Stack gap="0">
      <HStack justifyContent="space-between">
        <Text variant="lable" textTransform="unset">
          {label}
        </Text>
        <HStack>
          <Text variant="value">${value}</Text>
        </HStack>
      </HStack>
      <SliderWithState value={value} onChange={onChange} min={0} max={max} />
    </Stack>
  )
}

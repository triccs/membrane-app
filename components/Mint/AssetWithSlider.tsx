import { HStack, Stack, Text } from '@chakra-ui/react'
import { SliderWithState } from './SliderWithState'

export type AssetWithSliderProps = {
  label: string
  value?: number
  usdValue?: number
  sliderValue?: number
  onChange: (value: number) => void
}

export const AssetWithSlider = ({
  label,
  value,
  sliderValue = 0,
  onChange,
}: AssetWithSliderProps) => (
  <Stack gap="0">
    <HStack justifyContent="space-between">
      <Text variant="lable" textTransform="unset">
        {label}
      </Text>
      <HStack>
        <Text variant="value">{value}</Text>
      </HStack>
    </HStack>
    <SliderWithState value={sliderValue} onChange={onChange} />
  </Stack>
)

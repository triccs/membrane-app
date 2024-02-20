import { num } from '@/helpers/num'
import { Divider, Stack, TabPanel } from '@chakra-ui/react'
import { AssetWithSlider } from './AssetWithSlider'
import useComboBalance, { AssetWithBalance } from './hooks/useComboBalance'
import useMintState from './hooks/useMintState'

type Props = {}

const getSummary = (assets: AssetWithBalance[]) => {
  const filderZero = assets?.filter((a) => num(a.sliderValue).isGreaterThan(0))
  const summary = filderZero?.map((a) => {
    return {
      label: a.symbol,
      value: num(a.sliderValue).times(a.comboUsdValue).dividedBy(100).dividedBy(a.price).toFixed(6),
      usdValue: num(a.sliderValue).times(a.comboUsdValue).dividedBy(100).toFixed(2),
    }
  })

  const totalUsdValue = summary?.reduce((acc, a) => {
    return acc + num(a.usdValue).toNumber()
  }, 0)

  return {
    summary,
    totalUsdValue,
  }
}

const getLtv = (comboBalance: AssetWithBalance[]) => {
  return comboBalance?.reduce((acc, balance) => {
    return acc + balance.comboUsdValue
  }, 0)
}

const TakeAction = (props: Props) => {
  const { mintState, setMintState } = useMintState()

  const comboBalance = useComboBalance()
  const ltv = getLtv(comboBalance)

  const sliderChange = (value: number, symbol: string) => {
    const updatedAssets = mintState.assets.map((asset) => ({
      ...asset,
      sliderValue: asset.symbol === symbol ? value : asset.sliderValue,
    }))

    const ltvSlider = updatedAssets.reduce((acc, a) => {
      const ratio = num(a.comboUsdValue).dividedBy(ltv).times(100).toNumber()
      return acc + num(a.sliderValue).times(ratio).dividedBy(100).dp(2).toNumber()
    }, 0)

    const { summary, totalUsdValue } = getSummary(updatedAssets)

    setMintState({ assets: updatedAssets, ltvSlider, summary, totalUsdValue })
  }

  const totalsliderChange = (value: number) => {
    const updatedAssets = mintState?.assets.map((a) => ({ ...a, sliderValue: value })) || []

    const ltvSlider = updatedAssets.reduce((acc, a) => {
      const ratio = num(a.comboUsdValue).dividedBy(ltv).times(100).toNumber()
      return acc + num(value).times(ratio).dividedBy(100).dp(2).toNumber()
    }, 0)

    const { summary, totalUsdValue } = getSummary(updatedAssets)

    setMintState({ assets: updatedAssets, ltvSlider, summary, totalUsdValue })
  }

  return (
    <TabPanel>
      <Stack
        gap="5"
        maxH="35vh"
        overflowY="auto"
        w="full"
        px="3"
        css={{
          // Customize scrollbar appearance
          '::-webkit-scrollbar': {
            width: '6px', // Set width of the scrollbar
            backgroundColor: 'transparent', // Set background color of the scrollbar to transparent
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#c445f0', // Set color of the scrollbar thumb to blue
            borderRadius: '6px', // Set border radius of the scrollbar thumb
          },
        }}
      >
        {mintState?.assets?.map((asset) => {
          return (
            <AssetWithSlider
              key={asset?.base}
              label={asset?.symbol}
              value={asset.comboBalance}
              usdValue={asset?.comboUsdValue || 0}
              sliderValue={asset.sliderValue}
              onChange={(v: number) => sliderChange(v, asset?.symbol)}
            />
          )
        })}
      </Stack>
      <AssetWithSlider
        label="LTV"
        usdValue={ltv}
        sliderValue={mintState?.ltvSlider}
        onChange={totalsliderChange}
      />
    </TabPanel>
  )
}

export default TakeAction

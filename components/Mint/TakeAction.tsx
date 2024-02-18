import { num } from '@/helpers/num'
import { Stack, TabPanel } from '@chakra-ui/react'
import { AssetWithSlider } from './AssetWithSlider'
import useComboBalance, { AssetWithBalance } from './hooks/useComboBalance'
import useMintState from './hooks/useMintState'

type Props = {}

const getLtv = (comboBalance: AssetWithBalance[]) => {
  return comboBalance?.reduce((acc, balance) => {
    return acc + balance.comboUsdValue
  }, 0)
}

const TakeAction = (props: Props) => {
  const { mintState, setMintState } = useMintState()

  const comboBalance = useComboBalance()
  const ltv = getLtv(comboBalance)
  
  const sliderChange = (value: number, symbol:string) => {
    const updatedAssets = mintState.assets.map((asset) => ({
      ...asset,
      sliderValue: asset.symbol === symbol ? value : asset.sliderValue,
    }));
  
    const ltvSlider = updatedAssets.reduce((acc, a) => {
      const ratio = num(a.comboUsdValue).dividedBy(ltv).times(100).toNumber();
      return acc + num(a.sliderValue).times(ratio).dividedBy(100).dp(2).toNumber();
    }, 0);
  
    setMintState({ assets: updatedAssets, ltvSlider });
  };
  
  const totalsliderChange = (value:number) => {
    const updatedAssets = mintState?.assets.map((a) => ({ ...a, sliderValue: value })) || [];
  
    const ltvSlider = updatedAssets.reduce((acc, a) => {
      const ratio = num(a.comboUsdValue).dividedBy(ltv).times(100).toNumber();
      return acc + num(value).times(ratio).dividedBy(100).dp(2).toNumber();
    }, 0);
  
    setMintState({ assets: updatedAssets, ltvSlider });
  };

  return (
    <TabPanel>
    <Stack gap="5">
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

      <AssetWithSlider
        label="LTV"
        usdValue={ltv}
        sliderValue={mintState?.ltvSlider}
        onChange={totalsliderChange}
      />
    </Stack>
  </TabPanel>
  )
}

export default TakeAction
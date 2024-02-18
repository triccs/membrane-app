import { Asset } from "@/helpers/chain";
import { shiftDigits } from "@/helpers/math";
import { num } from "@/helpers/num";
import useBalance from "@/hooks/useBalance";
import { useBasket, useBasketPositions, useCollateralInterest } from "@/hooks/useCDP";
import { useOraclePrice } from "@/hooks/useOracle";
import { getBasketAssets, getPositions } from "@/services/cdp";
import { useMemo } from "react";

export type AssetWithBalance = Asset & {
    sliderValue? : number
    walletBalance: number
    walletsdValue : number
    deposited: number
    depositUsdValue : number
    comboBalance : number
    comboUsdValue : number
    price : number
  }

const useComboBalance = () => {
  const { data: collateralInterest } = useCollateralInterest()
  const { data: prices } = useOraclePrice()
  const {data : balances} = useBalance();
  const { data: basketPositions } = useBasketPositions()
  const { data: basket } = useBasket()

  return useMemo(() => {
    const basketAssets = getBasketAssets(basket!, collateralInterest!)
    const positions = getPositions(basketPositions, prices)

    return basketAssets?.map((asset) => {
        const position = positions.find((p) => p.denom === asset.asset.base)
        const balance = balances?.find((b) => b.denom === asset.asset.base) || { amount: '0' }
        const balanceInMicro = shiftDigits(balance.amount, -asset.asset.decimal).toNumber()
        const comboBalance = num(balanceInMicro || 0).plus(position?.amount || 0).toNumber()
        const price = prices?.find((p) => p.denom === asset.asset.base)?.price || 0
        const walletsdValue = num(balanceInMicro).times(price).toNumber()
        const depositUsdValue = position?.usdValue || 0
        const comboUsdValue = num(comboBalance).times(price).dp(6).toNumber()
        return {
            ...asset.asset,
            walletBalance: Number(balanceInMicro),
            walletsdValue,
            deposited: position?.amount,
            depositUsdValue,
            comboBalance,
            comboUsdValue,
            price,
        }
        
    }) as AssetWithBalance[]

  }, [balances, basketPositions, basket, prices])


    
}

export default useComboBalance;
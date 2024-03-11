import { cdtRoutes, denoms, mainnetAddrs, SWAP_SLIPPAGE } from "@/config/defaults";
import useWallet from "@/hooks/useWallet";
import { getPriceByDenom } from "@/services/oracle";
import { Coin, coin, coins } from "@cosmjs/amino";

import { calcAmountWithSlippage, calcShareOutAmount, convertGeckoPricesToDenomPriceHash, LiquidityPoolCalculator } from "@osmonauts/math";

import { osmosis } from 'osmojs';
import { SwapAmountInRoute } from "osmojs/dist/codegen/osmosis/poolmanager/v1beta1/swap_route";
import { getAssetBySymbol, exported_supportedAssets } from "./chain";
import { PositionsMsgComposer } from "@/contracts/codegen/positions/Positions.message-composer";

import { asset_list, assets } from '@chain-registry/osmosis';
import BigNumber from "bignumber.js";
import { MsgSwapExactAmountIn } from "osmojs/dist/codegen/osmosis/gamm/v1beta1/tx";
import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { EncodeObject } from "@cosmjs/proto-signing";
import { Asset } from "@/contracts/codegen/positions/Positions.types";
import { useEffect, useState } from "react";
import { getAssetRatio, getBasketPositions, getPositionAssets } from "@/services/cdp";
import useMintState from "@/components/Mint/hooks/useMintState";
import useVaultSummary from "@/components/Mint/hooks/useVaultSummary";
import { useOraclePrice } from "@/hooks/useOracle";
import { useBasket, useBasketPositions } from "@/hooks/useCDP";
import { useBalanceByAsset } from "@/hooks/useBalance";
import { useAssetBySymbol } from "@/hooks/useAssets";


const secondsInADay = 24 * 60 * 60; // Define the missing variable

export interface swapRoutes {
    OSMO: SwapAmountInRoute[],
    ATOM: SwapAmountInRoute[],
    "USDC.axl": SwapAmountInRoute[],
    USDC: SwapAmountInRoute[],
    stATOM: SwapAmountInRoute[],
    stOSMO: SwapAmountInRoute[],
    TIA: SwapAmountInRoute[],
    USDT: SwapAmountInRoute[],
    MBRN: SwapAmountInRoute[],
    CDT: SwapAmountInRoute[],
};

const {
    joinPool,
    exitPool,
    joinSwapExternAmountIn,
    swapExactAmountIn,
} = osmosis.gamm.v1beta1.MessageComposer.withTypeUrl;
const {
    lockTokens,
    beginUnlocking
} = osmosis.lockup.MessageComposer.withTypeUrl;

function getPositionLTV(position_value: number, credit_amount: number) {
    const { data: basket } = useBasket()
    let debt_value = (credit_amount) * parseFloat(basket?.credit_price.price ?? "1");

    return debt_value / position_value;
}

//////Quick Action functions
//Initialize osmosis client
const [osmosisQueryClient, setosmosisQueryClient] = useState<any | null>(null);
//Get Osmosis Client
useEffect(() => {
    if (osmosisQueryClient === null || osmosisQueryClient === undefined) {
        const { createRPCQueryClient } = osmosis.ClientFactory;
        const osmosisClient = createRPCQueryClient({ rpcEndpoint: "https://osmosis-rpc.polkachu.com/" }).then((osmosisClient) => {
            if (!osmosisClient) {
                console.error('osmosisClient undefined.');
                return;
            }

            //Set client
            setosmosisQueryClient(osmosisClient);
        });
    }
}, []); //We'll add dependencies for Quick Actions clicks so that this requeries if the user is about to need it & its undefined
//Initialize osmosis variables
//@ts-ignore
let cg_prices;
const osmosisAssets = [
    ...assets.assets,
    ...asset_list.assets,
].filter(({ type_asset }) => type_asset !== 'ics20').filter((asset) => asset !== undefined);
//@ts-ignore
cg_prices = convertGeckoPricesToDenomPriceHash(osmosisAssets, priceResponse);
//@ts-ignore
let calculator = new LiquidityPoolCalculator({ assets: osmosisAssets });

/////functions/////
export const unloopPosition = (positionId: string, loops: number) => {
    const { address } = useWallet()
    const { mintState } = useMintState()
    const { data: prices } = useOraclePrice()
    const cdtAsset = useAssetBySymbol('CDT')
    const walletCDT = useBalanceByAsset(cdtAsset)
    const { initialTVL, debtAmount, initialBorrowLTV } = useVaultSummary();

    //Create CDP Message Composer
    const cdp_composer = new PositionsMsgComposer(address!, mainnetAddrs.positions);
    //getPosition
    const { data: basketPositions } = useBasketPositions()

    //Set Position value
    var positionValue = initialTVL!;
    //Set credit amount
    var creditAmount = debtAmount;
    //set borrowLTV
    var borrowLTV = initialBorrowLTV! / 100;

    //Get Position's LTV
    var currentLTV = getPositionLTV(positionValue, creditAmount);
    //If current LTV is over the borrowable LTV, we can't withdraw anything
    if (currentLTV > borrowLTV) {
        console.log("Current LTV is over the Position's borrowable LTV, we can't withdraw collateral")
        return;
    }
    //Get position cAsset ratios 
    //Ratios won't change in btwn loops so we can set them outside the loop
    let cAsset_ratios = getAssetRatio(initialTVL!, getPositionAssets(mintState.index, basketPositions, prices));

    //Repeat until no more CDT or Loops are done
    var iter = 0;
    var all_msgs: EncodeObject[] = [];
    while ((creditAmount > 0 || iter == 0) && iter < loops) {
        //Set LTV range
        //We can withdraw value up to the borrowable LTV
        //Or the current LTV, whichever is lower
        let LTV_range = Math.min(borrowLTV - currentLTV, currentLTV);
        //Set value to withdraw
        var withdrawValue = positionValue * LTV_range;

        //.Divvy withdraw value to the cAssets based on ratio
        //Transform the value to the cAsset's amount using its price & decimals
        let cAsset_amounts = cAsset_ratios.map((asset) => {
            const assetPrice = prices?.find((price) => price.denom === asset.denom)?.price || '0'

            return [asset.symbol, parseInt(((asset.ratio * withdrawValue) / parseFloat(assetPrice) * Math.pow(10, denoms[asset.symbol as keyof exported_supportedAssets][1] as number)).toFixed(0))];
        });
        //Save amounts as assets for withdraw msg
        var assets: Asset[] = [];
        cAsset_amounts.forEach((amount) => {
            if (amount[1] as number != 0) {
                assets.push(
                    {
                        amount: amount[1].toString(),
                        //@ts-ignore
                        info: {
                            //@ts-ignore
                            native_token: {
                                denom: denoms[amount[0] as keyof exported_supportedAssets][0] as string
                            }
                        }
                    });
            }
        });


        //Create withdraw msg for assets
        var withdraw_msg: MsgExecuteContractEncodeObject = cdp_composer.withdraw({
            positionId: positionId,
            assets,
        });

        //Create Swap msgs to CDT for each cAsset & save tokenOutMinAmount
        var swap_msgs: EncodeObject[] = [];
        var tokenOutMin = 0;
        cAsset_amounts.forEach((amount) => {
            if (amount[1] as number != 0) {
                let swap_output = handleCDTswaps(amount[0] as keyof exported_supportedAssets, parseInt(amount[1].toString()) as number)!;
                swap_msgs.push(swap_output);
                tokenOutMin += parseInt((swap_output.value as MsgSwapExactAmountIn).tokenOutMinAmount);
            }
        });

        //Create repay msg with newly swapped CDT
        var repay_msg: EncodeObject = cdp_composer.repay({
            positionId: positionId,
        });
        repay_msg.value.funds = [coin(tokenOutMin.toString(), denoms.CDT[0] as string)];

        console.log(repay_msg.value.funds)


        //Subtract slippage to mint value
        withdrawValue = parseFloat(calcAmountWithSlippage(withdrawValue.toString(), SWAP_SLIPPAGE));
        //Calc new TVL (w/ slippage calculated into the mintValue)
        positionValue = positionValue - withdrawValue;


        //Repayments under 100 CDT will fail unless fully repaid
        //NOTE: This will leave the user with leftover CDT in their wallet, maximum 50 CDT
        if ((creditAmount - repay_msg.value.funds[0].amount) < 100_000_000 && (creditAmount - repay_msg.value.funds[0].amount) > 0) {
            //Set repay amount so that credit amount is 100
            repay_msg.value.funds = [coin((creditAmount - 100_000_000).toString(), denoms.CDT[0] as string)];
            //break loop
            iter = loops;
        }

        //Attempted full repay
        if (LTV_range === currentLTV) {
            //Set credit amount to 0
            creditAmount = 0;
            //Add any walletCDT to the repay amount to account for interest & slippage
            repay_msg.value.funds = [coin((creditAmount + (parseFloat(walletCDT) * 1_000_000)).toFixed(0), denoms.CDT[0] as string)];
        } else {
            //Set credit amount including slippage
            creditAmount -= repay_msg.value.funds[0].amount;
        }

        //Calc new LTV
        currentLTV = getPositionLTV(positionValue, creditAmount);

        //Add msgs to all_msgs
        all_msgs = all_msgs.concat([withdraw_msg]).concat(swap_msgs).concat([repay_msg]);

        //Increment iter
        iter += 1;
    }

    console.log(all_msgs, iter)

    return all_msgs

}
//Ledger has a msg max of 3 msgs per tx (untested), so users can only loop with a max of 1 collateral
//LTV as a decimal
export const loopPosition = (LTV: number, positionId: string, loops: number) => {
    const { address } = useWallet()
    const { mintState } = useMintState()
    const { data: prices } = useOraclePrice()
    const { data: basket } = useBasket()
    const { initialTVL, debtAmount, initialBorrowLTV } = useVaultSummary();

    //Create CDP Message Composer
    const cdp_composer = new PositionsMsgComposer(address!, mainnetAddrs.positions);
    //getPosition
    const { data: basketPositions } = useBasketPositions()

    //Set Position value
    var positionValue = initialTVL!;
    //Set credit amount
    var creditAmount = debtAmount;
    //Confirm desired LTV isn't over the borrowable LTV
    if (LTV >= initialBorrowLTV! / 100) {
        console.log("Desired LTV is over the Position's borrowable LTV")
        return;
    }
    //Get position cAsset ratios 
    //Ratios won't change in btwn loops so we can set them outside the loop
    let cAsset_ratios = getAssetRatio(initialTVL!, getPositionAssets(mintState.index, basketPositions, prices));
    //Get Position's LTV
    var currentLTV = getPositionLTV(positionValue, creditAmount);
    if (LTV < currentLTV) {
        console.log("Desired LTV is under the Position's current LTV")
        return;
    }

    //Repeat until CDT to mint is under 1 or Loops are done
    var mintAmount = 0;
    var iter = 0;
    var all_msgs: EncodeObject[] = [];
    while ((mintAmount > 1_000_000 || iter == 0) && iter < loops) {
        //Set LTV range
        let LTV_range = LTV - currentLTV;
        //Set value to mint
        var mintValue = positionValue * LTV_range;
        //Set amount to mint
        mintAmount = parseInt(((mintValue / parseFloat(basket!.credit_price.price)) * 1_000_000).toFixed(0));

        //Create mint msg
        let mint_msg: EncodeObject = cdp_composer.increaseDebt({
            positionId: positionId,
            amount: mintAmount.toString(),
        });
        //Divvy mint amount to the cAssets based on ratio
        let cAsset_amounts = cAsset_ratios.map((asset) => {
            return [asset.symbol, (asset.ratio * mintAmount)];
        });

        //Create Swap msgs from CDT for each cAsset & save tokenOutMinAmount
        var swap_msgs: EncodeObject[] = [];
        var tokenOutMins: Coin[] = [];
        cAsset_amounts.forEach((amount) => {
            if (amount[1] as number > 0) {
                let swap_output = handleCollateralswaps(amount[0] as keyof exported_supportedAssets, parseInt(amount[1].toString()) as number)!;
                swap_msgs.push(swap_output);
                tokenOutMins.push(coin((swap_output.value as MsgSwapExactAmountIn).tokenOutMinAmount, denoms[amount[0] as keyof exported_supportedAssets][0] as string));
            }
        });
        //Create deposit msgs for newly swapped assets
        var deposit_msg: MsgExecuteContractEncodeObject = cdp_composer.deposit({
            positionId: positionId,
        });
        //Sort tokenOutMins alphabetically
        tokenOutMins.sort((a, b) => (a.denom > b.denom) ? 1 : -1);
        deposit_msg.value.funds = tokenOutMins;
        //////////////////////////

        //Subtract slippage to mint value
        mintValue = parseFloat(calcAmountWithSlippage(mintValue.toString(), SWAP_SLIPPAGE));
        //Calc new TVL (w/ slippage calculated into the mintValue)
        positionValue = positionValue + mintValue;

        //Set credit amount
        creditAmount += mintAmount;
        //Calc new LTV
        currentLTV = getPositionLTV(positionValue, creditAmount);

        //Add msgs to all_msgs
        all_msgs = all_msgs.concat([mint_msg]).concat(swap_msgs).concat([deposit_msg]);

        //Increment iter
        iter += 1;
    }

    console.log(all_msgs, iter)

    return all_msgs
}
export const exitCLPools = (poolId: number) => {
    console.log("exit_cl_attempt")
    let msg = [] as EncodeObject[];
    const { address } = useWallet()

    //Query CL pool
    osmosisQueryClient!.osmosis.concentratedliquidity.v1beta1.userPositions({
        address: address! as string,
        poolId,
    }).then((userPoolResponse) => {

        //Convert user positions to a list of position IDs
        //@ts-ignore
        let positionIds = userPoolResponse.positions.map((position) => {
            return position.position.positionId;
        });

        let collect_msg = osmosis.concentratedliquidity.v1beta1.MessageComposer.withTypeUrl.collectSpreadRewards({
            positionIds,
            sender: address! as string,
        });
        let collect_msg_2 = osmosis.concentratedliquidity.v1beta1.MessageComposer.withTypeUrl.collectIncentives({
            positionIds,
            sender: address! as string,
        });
        let withdraw_msg = osmosis.concentratedliquidity.v1beta1.MessageComposer.withTypeUrl.withdrawPosition({
            positionId: userPoolResponse.positions[0].position.positionId,
            sender: address! as string,
            liquidityAmount: userPoolResponse.positions[0].position.liquidity,
        });
        //Add msgs
        msg = msg.concat([collect_msg, collect_msg_2, withdraw_msg]);
    });

    return msg
}
export const exitGAMMPools = (poolId: number, shareInAmount: string) => {
    const { address } = useWallet()
    let msg = [] as EncodeObject[];

    //Query pool
    osmosisQueryClient!.osmosis.gamm.v1beta1.pool({
        poolId
    }).then((poolResponse) => {

        let pool = poolResponse.pool;
        let poolAssets = pool.poolAssets;
        let totalShares = pool.totalShares;
        //Calc user's share of pool
        let shareAmount = new BigNumber(shareInAmount);
        let totalShareAmount = new BigNumber(totalShares.amount);
        let userShare = shareAmount.div(totalShareAmount);
        console.log(userShare)
        //Calc user's share of poolAssets
        //@ts-ignore
        let tokenOutMins = poolAssets.map((asset) => {
            if (asset.token.amount !== undefined) {
                return coin(
                    parseInt(calcAmountWithSlippage((parseInt(asset.token.amount) * parseFloat(userShare.valueOf())).toFixed(0), SWAP_SLIPPAGE)),
                    asset.token.denom);
            }
        });
        console.log(tokenOutMins)

        //Exit pool
        msg.push(exitPool({
            poolId: BigInt(poolId),
            sender: address! as string,
            shareInAmount,
            tokenOutMins,
        }));
    });

    return msg

}
//////joinPools
//The input tokens must be in the order of the pool's assets
//pool 1268 is CDT/USDC
export const joinCLPools = (tokenIn1: Coin, poolId: number, tokenIn2: Coin) => {
    console.log("join_CL_pool_attempt")
    let msg = [] as EncodeObject[];
    const { address } = useWallet()
    let joinCoins = [tokenIn1, tokenIn2];

    msg.push(osmosis.concentratedliquidity.v1beta1.MessageComposer.withTypeUrl.createPosition({
        poolId: BigInt(poolId),
        sender: address! as string,
        //This range is .98 to 1.02
        // lowerTick: BigInt("-200000"),
        // upperTick: BigInt(20000),
        //This is range .99 to 1.01
        lowerTick: BigInt("-100000"),
        upperTick: BigInt(10000),
        /**
         * tokens_provided is the amount of tokens provided for the position.
         * It must at a minimum be of length 1 (for a single sided position)
         * and at a maximum be of length 2 (for a position that straddles the current
         * tick).
         */
        tokensProvided: joinCoins,
        //Do we care about input minimums since we are depositing both?
        tokenMinAmount0: "0",
        tokenMinAmount1: "0",
    }));

    return msg
}
//This is used primarily to loop GAMM shares used as collateral
export const joinGAMMPools = (tokenIn1: Coin, poolId: number, tokenIn2?: Coin) => {
    var msg = [] as EncodeObject[];
    //@ts-ignore
    if (osmosisQueryClient !== null && cg_prices !== null && osmosisAssets !== undefined) {
        console.log("join_pool_attempt")
        const { address } = useWallet()
        //Query pool
        osmosisQueryClient!.osmosis.gamm.v1beta1.pool({
            poolId
        }).then((poolResponse) => {

            let pool = poolResponse.pool;
            //JoinPool no Swap
            if (tokenIn2 !== undefined) {
                let joinCoins = [tokenIn1, tokenIn2];
                const shareOutAmount = calcShareOutAmount(pool, joinCoins);
                const tokenInMaxs = joinCoins.map((c: Coin) => {
                    return coin(c.amount, c.denom);
                });

                msg.push(joinPool({
                    poolId: BigInt(poolId),
                    sender: address! as string,
                    tokenInMaxs: tokenInMaxs,
                    shareOutAmount: parseInt(calcAmountWithSlippage(shareOutAmount, SWAP_SLIPPAGE)).toString(),
                }))

            } else {
                //Join with Swap        
                //@ts-ignore
                let tokenPrice = cg_prices[tokenIn1.denom as CoinDenom];

                //Find the key for the denom
                let tokenKey = Object.keys(denoms).find(key => denoms[key as keyof exported_supportedAssets][0] === tokenIn1.denom);
                let tokenInValue = (parseFloat(tokenPrice) * parseFloat(tokenIn1.amount) / Math.pow(10, denoms[tokenKey as keyof exported_supportedAssets][1] as number));
                // console.log(tokenInValue)
                //@ts-ignore
                const coinsNeeded = calculator.convertDollarValueToCoins(tokenInValue, pool, cg_prices);
                // console.log(coinsNeeded)
                const shareOutAmount = calcShareOutAmount(pool, coinsNeeded);
                // console.log(shareOutAmount)

                msg.push(joinSwapExternAmountIn({
                    poolId: BigInt(poolId),
                    sender: address! as string,
                    tokenIn: tokenIn1,
                    shareOutMinAmount: parseInt(calcAmountWithSlippage(shareOutAmount, SWAP_SLIPPAGE)).toString(),
                }))

            }
        });
    }
    return msg
}

export const lockGAMMPool = (shareInAmount: Coin) => {
    console.log("lock_pool_attempt")
    let msg = [] as EncodeObject[];
    const { address } = useWallet()

    msg.push(lockTokens({
        owner: address! as string,
        duration: {
            seconds: BigInt(7 * secondsInADay),
            nanos: 0,
        },
        coins: [shareInAmount],
    }));

    return msg
}

export const unlockGAMMPool = (poolID: string, shareInAmount: Coin) => {
    console.log("unlock_pool_attempt")
    let msg = [] as EncodeObject[];
    const { address } = useWallet()

    msg.push(beginUnlocking({
        owner: address! as string,
        coins: [shareInAmount],
        ID: BigInt(poolID),
    }));

    return msg

}

//This is for CDT using the oracle's prices
const getCDTtokenOutAmount = (tokenInAmount: number, tokenIn: string) => {
    let basePrice = getPriceByDenom(tokenIn);
    let tokenOut = getPriceByDenom(denoms.CDT[0] as string);

    return tokenInAmount * (basePrice / tokenOut)
}
//Parse through saved Routes until we reach CDT
const getCDTRoute = (tokenIn: keyof exported_supportedAssets) => {
    var route = cdtRoutes[tokenIn];
    //to protect against infinite loops
    var iterations = 0;

    while (route != undefined && route[route.length - 1].tokenOutDenom as string !== denoms.CDT[0] && iterations < 5) {
        //Find the key from this denom
        let routeDenom = route[route.length - 1].tokenOutDenom as string;
        //Set the next node in the route path
        let routeKey = Object.keys(denoms).find(key => denoms[key as keyof exported_supportedAssets][0] === routeDenom);
        //Add the next node to the route
        route = route.concat(cdtRoutes[routeKey as keyof exported_supportedAssets]);

        //output to test
        console.log(route)
        iterations += 1;
    }

    return route;
}
//This is getting Swaps To CDT
export const handleCDTswaps = (tokenIn: keyof exported_supportedAssets, tokenInAmount: number) => {
    console.log("swap_attempt")
    //Asserting prices were queried
    if (getPriceByDenom("uosmo") !== 0) {
        const { address } = useWallet()
        //Get tokenOutAmount
        const tokenOutAmount = getCDTtokenOutAmount(tokenInAmount, tokenIn);
        //Swap routes
        const routes: SwapAmountInRoute[] = getCDTRoute(tokenIn);

        const tokenOutMinAmount = parseInt(calcAmountWithSlippage(tokenOutAmount.toString(), SWAP_SLIPPAGE)).toString();

        const msg = swapExactAmountIn({
            sender: address! as string,
            routes,
            tokenIn: coin(tokenInAmount, denoms[tokenIn][0] as string),
            tokenOutMinAmount
        });

        return msg;
        // await base_client?.signAndBroadcast(user_address, [msg], "auto",).then((res) => {console.log(res)});
        // handleCDTswaps("atom", 1000000)
    }
};

//Parse through saved Routes until we reach CDT
const getCollateralRoute = (tokenOut: keyof exported_supportedAssets) => {//Swap routes
    const temp_routes: SwapAmountInRoute[] = getCDTRoute(tokenOut);

    //Reverse the route
    var routes = temp_routes.reverse();
    //Swap tokenOutdenom of the route to the key of the route
    routes = routes.map((route) => {
        let routeDenom = route.tokenOutDenom as string;
        let routeKey = Object.keys(cdtRoutes).find(key => cdtRoutes[key as keyof exported_supportedAssets][0].tokenOutDenom === routeDenom && route.poolId === cdtRoutes[key as keyof exported_supportedAssets][0].poolId);

        let keyDenom = denoms[routeKey as keyof exported_supportedAssets][0] as string;
        return {
            poolId: route.poolId,
            tokenOutDenom: keyDenom,
        }
    });

    if (tokenOut === "USDC") {
        console.log(temp_routes, routes)
    }

    return routes;
}

//This is for Collateral using the oracle's prices
const getCollateraltokenOutAmount = (CDTInAmount: number, tokenOut: string) => {
    let basePrice = getPriceByDenom(denoms.CDT[0] as string);
    let asset = getAssetBySymbol(tokenOut);
    let tokenOutPrice = getPriceByDenom(asset?.address ?? '');

    return CDTInAmount * (basePrice / tokenOutPrice)
}

//Swapping CDT to collateral
export const handleCollateralswaps = (tokenOut: keyof exported_supportedAssets, CDTInAmount: number) => {
    console.log("collateral_swap_attempt")
    //Asserting prices were queried
    if (getPriceByDenom("uosmo") !== undefined) {
        //Get tokenOutAmount
        const tokenOutAmount = getCollateraltokenOutAmount(CDTInAmount, tokenOut);
        //Swap routes
        const routes: SwapAmountInRoute[] = getCollateralRoute(tokenOut);

        const tokenOutMinAmount = parseInt(calcAmountWithSlippage(tokenOutAmount.toString(), SWAP_SLIPPAGE)).toString();

        const { address } = useWallet()
        const msg = swapExactAmountIn({
            sender: address! as string,
            routes,
            tokenIn: coin(CDTInAmount.toString(), denoms.CDT[0] as string),
            tokenOutMinAmount
        });

        // await base_client?.signAndBroadcast(user_address, [msg], "auto",).then((res) => {console.log(res)});
        return msg;
    }
};
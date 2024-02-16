/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { toUtf8 } from "@cosmjs/encoding";
import { Uint128, AssetInfo, Addr, Decimal, AssetPool, Asset, Deposit, ClaimsResponse, Coin, Config, DepositPositionResponse, ExecuteMsg, UpdateConfig, UserInfo, InstantiateMsg, LiquidatibleResponse, QueryMsg } from "./StabilityPool.types";
export interface StabilityPoolMsg {
  contractAddress: string;
  sender: string;
  updateConfig: ({
    incentiveRate,
    maxIncentives,
    mbrnDenom,
    minimumDepositAmount,
    osmosisProxy,
    owner,
    positionsContract,
    unstakingPeriod
  }: {
    incentiveRate?: Decimal;
    maxIncentives?: Uint128;
    mbrnDenom?: string;
    minimumDepositAmount?: Uint128;
    osmosisProxy?: string;
    owner?: string;
    positionsContract?: string;
    unstakingPeriod?: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  deposit: ({
    user
  }: {
    user?: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  withdraw: ({
    amount
  }: {
    amount: Uint128;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  restake: ({
    restakeAmount
  }: {
    restakeAmount: Decimal;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  claimRewards: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
  liquidate: ({
    liqAmount
  }: {
    liqAmount: Decimal;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  distribute: ({
    distributeFor,
    distributionAssetRatios,
    distributionAssets
  }: {
    distributeFor: Uint128;
    distributionAssetRatios: Decimal[];
    distributionAssets: Asset[];
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  repay: ({
    repayment,
    userInfo
  }: {
    repayment: Asset;
    userInfo: UserInfo;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
}
export class StabilityPoolMsgComposer implements StabilityPoolMsg {
  sender: string;
  contractAddress: string;

  constructor(sender: string, contractAddress: string) {
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.restake = this.restake.bind(this);
    this.claimRewards = this.claimRewards.bind(this);
    this.liquidate = this.liquidate.bind(this);
    this.distribute = this.distribute.bind(this);
    this.repay = this.repay.bind(this);
  }

  updateConfig = ({
    incentiveRate,
    maxIncentives,
    mbrnDenom,
    minimumDepositAmount,
    osmosisProxy,
    owner,
    positionsContract,
    unstakingPeriod
  }: {
    incentiveRate?: Decimal;
    maxIncentives?: Uint128;
    mbrnDenom?: string;
    minimumDepositAmount?: Uint128;
    osmosisProxy?: string;
    owner?: string;
    positionsContract?: string;
    unstakingPeriod?: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          update_config: {
            incentive_rate: incentiveRate,
            max_incentives: maxIncentives,
            mbrn_denom: mbrnDenom,
            minimum_deposit_amount: minimumDepositAmount,
            osmosis_proxy: osmosisProxy,
            owner,
            positions_contract: positionsContract,
            unstaking_period: unstakingPeriod
          }
        })),
        funds: _funds
      })
    };
  };
  deposit = ({
    user
  }: {
    user?: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          deposit: {
            user
          }
        })),
        funds: _funds
      })
    };
  };
  withdraw = ({
    amount
  }: {
    amount: Uint128;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          withdraw: {
            amount
          }
        })),
        funds: _funds
      })
    };
  };
  restake = ({
    restakeAmount
  }: {
    restakeAmount: Decimal;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          restake: {
            restake_amount: restakeAmount
          }
        })),
        funds: _funds
      })
    };
  };
  claimRewards = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          claim_rewards: {}
        })),
        funds: _funds
      })
    };
  };
  liquidate = ({
    liqAmount
  }: {
    liqAmount: Decimal;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          liquidate: {
            liq_amount: liqAmount
          }
        })),
        funds: _funds
      })
    };
  };
  distribute = ({
    distributeFor,
    distributionAssetRatios,
    distributionAssets
  }: {
    distributeFor: Uint128;
    distributionAssetRatios: Decimal[];
    distributionAssets: Asset[];
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          distribute: {
            distribute_for: distributeFor,
            distribution_asset_ratios: distributionAssetRatios,
            distribution_assets: distributionAssets
          }
        })),
        funds: _funds
      })
    };
  };
  repay = ({
    repayment,
    userInfo
  }: {
    repayment: Asset;
    userInfo: UserInfo;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          repay: {
            repayment,
            user_info: userInfo
          }
        })),
        funds: _funds
      })
    };
  };
}
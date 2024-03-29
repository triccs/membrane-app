/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Decimal = string;
export type Uint128 = string;
export type AssetInfo = {
  token: {
    address: Addr;
  };
} | {
  native_token: {
    denom: string;
  };
};
export type Addr = string;
export interface BasketPositionsResponse {
  positions: PositionResponse[];
  user: string;
}
export interface PositionResponse {
  avg_borrow_LTV: Decimal;
  avg_max_LTV: Decimal;
  cAsset_ratios: Decimal[];
  collateral_assets: CAsset[];
  credit_amount: Uint128;
  position_id: Uint128;
}
export interface CAsset {
  asset: Asset;
  max_LTV: Decimal;
  max_borrow_LTV: Decimal;
  pool_info?: PoolInfo | null;
  rate_index: Decimal;
}
export interface Asset {
  amount: Uint128;
  info: AssetInfo;
}
export interface PoolInfo {
  asset_infos: LPAssetInfo[];
  pool_id: number;
}
export interface LPAssetInfo {
  decimals: number;
  info: AssetInfo;
  ratio: Decimal;
}
export interface Basket {
  base_interest_rate: Decimal;
  basket_id: Uint128;
  collateral_supply_caps: SupplyCap[];
  collateral_types: CAsset[];
  cpc_margin_of_error: Decimal;
  credit_asset: Asset;
  credit_last_accrued: number;
  credit_price: PriceResponse;
  current_position_id: Uint128;
  frozen: boolean;
  lastest_collateral_rates: Rate[];
  liq_queue?: Addr | null;
  multi_asset_supply_caps: MultiAssetSupplyCap[];
  negative_rates: boolean;
  oracle_set: boolean;
  pending_revenue: Uint128;
  rates_last_accrued: number;
  rev_to_stakers: boolean;
}
export interface SupplyCap {
  asset_info: AssetInfo;
  current_supply: Uint128;
  debt_total: Uint128;
  lp: boolean;
  stability_pool_ratio_for_debt_cap?: Decimal | null;
  supply_cap_ratio: Decimal;
}
export interface PriceResponse {
  decimals: number;
  price: Decimal;
  prices: PriceInfo[];
}
export interface PriceInfo {
  price: Decimal;
  source: string;
}
export interface Rate {
  last_time_updated: number;
  rate: Decimal;
}
export interface MultiAssetSupplyCap {
  assets: AssetInfo[];
  supply_cap_ratio: Decimal;
}
export interface CollateralInterestResponse {
  rates: Decimal[];
}
export interface Config {
  base_debt_cap_multiplier: Uint128;
  collateral_twap_timeframe: number;
  cpc_multiplier: Decimal;
  credit_twap_timeframe: number;
  debt_auction?: Addr | null;
  debt_minimum: Uint128;
  dex_router?: Addr | null;
  discounts_contract?: Addr | null;
  liq_fee: Decimal;
  liquidity_contract?: Addr | null;
  oracle_contract?: Addr | null;
  oracle_time_limit: number;
  osmosis_proxy?: Addr | null;
  owner: Addr;
  rate_slope_multiplier: Decimal;
  stability_pool?: Addr | null;
  staking_contract?: Addr | null;
}
export interface DebtCap {
  cap: Uint128;
  collateral: AssetInfo;
  debt_total: Uint128;
}
export type ExecuteMsg = {
  update_config: UpdateConfig;
} | {
  deposit: {
    position_id?: Uint128 | null;
    position_owner?: string | null;
  };
} | {
  increase_debt: {
    LTV?: Decimal | null;
    amount?: Uint128 | null;
    mint_to_addr?: string | null;
    position_id: Uint128;
  };
} | {
  withdraw: {
    assets: Asset[];
    position_id: Uint128;
    send_to?: string | null;
  };
} | {
  repay: {
    position_id: Uint128;
    position_owner?: string | null;
    send_excess_to?: string | null;
  };
} | {
  liq_repay: {};
} | {
  liquidate: {
    position_id: Uint128;
    position_owner: string;
  };
} | {
  redeem_collateral: {
    max_collateral_premium?: number | null;
  };
} | {
  edit_redeemability: {
    max_loan_repayment?: Decimal | null;
    position_ids: Uint128[];
    premium?: number | null;
    redeemable?: boolean | null;
    restricted_collateral_assets?: string[] | null;
  };
} | {
  accrue: {
    position_ids: Uint128[];
    position_owner?: string | null;
  };
} | {
  edit_basket: EditBasket;
} | {
  editc_asset: {
    asset: AssetInfo;
    max_LTV?: Decimal | null;
    max_borrow_LTV?: Decimal | null;
  };
} | {
  callback: CallbackMsg;
};
export type PoolType = {
  balancer: {
    pool_id: number;
  };
} | {
  stable_swap: {
    pool_id: number;
  };
};
export type CallbackMsg = {
  bad_debt_check: {
    position_id: Uint128;
    position_owner: Addr;
  };
};
export interface UpdateConfig {
  base_debt_cap_multiplier?: Uint128 | null;
  collateral_twap_timeframe?: number | null;
  cpc_multiplier?: Decimal | null;
  credit_twap_timeframe?: number | null;
  debt_auction?: string | null;
  debt_minimum?: Uint128 | null;
  dex_router?: string | null;
  discounts_contract?: string | null;
  liq_fee?: Decimal | null;
  liquidity_contract?: string | null;
  oracle_contract?: string | null;
  oracle_time_limit?: number | null;
  osmosis_proxy?: string | null;
  owner?: string | null;
  rate_slope_multiplier?: Decimal | null;
  stability_pool?: string | null;
  staking_contract?: string | null;
}
export interface EditBasket {
  added_cAsset?: CAsset | null;
  base_interest_rate?: Decimal | null;
  collateral_supply_caps?: SupplyCap[] | null;
  cpc_margin_of_error?: Decimal | null;
  credit_asset_twap_price_source?: TWAPPoolInfo | null;
  credit_pool_infos?: PoolType[] | null;
  frozen?: boolean | null;
  liq_queue?: string | null;
  multi_asset_supply_caps?: MultiAssetSupplyCap[] | null;
  negative_rates?: boolean | null;
  rev_to_stakers?: boolean | null;
  take_revenue?: Uint128 | null;
}
export interface TWAPPoolInfo {
  base_asset_denom: string;
  pool_id: number;
  quote_asset_denom: string;
}
export interface InstantiateMsg {
  base_debt_cap_multiplier: Uint128;
  collateral_twap_timeframe: number;
  create_basket: CreateBasket;
  credit_twap_timeframe: number;
  debt_auction?: string | null;
  debt_minimum: Uint128;
  dex_router?: string | null;
  discounts_contract?: string | null;
  liq_fee: Decimal;
  liquidity_contract?: string | null;
  oracle_contract?: string | null;
  oracle_time_limit: number;
  osmosis_proxy?: string | null;
  owner?: string | null;
  rate_slope_multiplier: Decimal;
  stability_pool?: string | null;
  staking_contract?: string | null;
}
export interface CreateBasket {
  base_interest_rate?: Decimal | null;
  basket_id: Uint128;
  collateral_types: CAsset[];
  credit_asset: Asset;
  credit_pool_infos: PoolType[];
  credit_price: Decimal;
  liq_queue?: string | null;
}
export interface InterestResponse {
  credit_interest: Decimal;
  negative_rate: boolean;
}
export type QueryMsg = {
  config: {};
} | {
  get_basket_redeemability: {
    limit?: number | null;
    position_owner?: string | null;
    start_after?: number | null;
  };
} | {
  get_basket_positions: {
    limit?: number | null;
    start_after?: string | null;
    user?: string | null;
    user_info?: UserInfo | null;
  };
} | {
  get_basket: {};
} | {
  get_basket_debt_caps: {};
} | {
  get_credit_rate: {};
} | {
  get_collateral_interest: {};
};
export interface UserInfo {
  position_id: Uint128;
  position_owner: string;
}
export interface RedeemabilityResponse {
  premium_infos: PremiumInfo[];
}
export interface PremiumInfo {
  premium: number;
  users_of_premium: RedemptionInfo[];
}
export interface RedemptionInfo {
  position_infos: PositionRedemption[];
  position_owner: Addr;
}
export interface PositionRedemption {
  position_id: Uint128;
  remaining_loan_repayment: Uint128;
  restricted_collateral_assets: string[];
}
export type PositionsExecuteMsg = ExecuteMsg;
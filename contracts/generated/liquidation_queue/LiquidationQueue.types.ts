/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Uint256 = string;
export type Uint128 = string;
export type Decimal256 = string;
export interface BidResponse {
  amount: Uint256;
  epoch_snapshot: Uint128;
  id: Uint128;
  liq_premium: number;
  pending_liquidated_collateral: Uint256;
  product_snapshot: Decimal256;
  scale_snapshot: Uint128;
  sum_snapshot: Decimal256;
  user: string;
  wait_end?: number | null;
}
export interface ClaimsResponse {
  bid_for: string;
  pending_liquidated_collateral: Uint256;
}
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
export interface Config {
  added_assets?: AssetInfo[] | null;
  bid_asset: AssetInfo;
  maximum_waiting_bids: number;
  minimum_bid: Uint128;
  owner: Addr;
  positions_contract: Addr;
  waiting_period: number;
}
export type ExecuteMsg = {
  submit_bid: {
    bid_input: BidInput;
    bid_owner?: string | null;
  };
} | {
  retract_bid: {
    amount?: Uint256 | null;
    bid_for: AssetInfo;
    bid_id: Uint128;
  };
} | {
  liquidate: {
    bid_for: AssetInfo;
    collateral_amount: Uint256;
    collateral_price: Decimal;
    credit_price: Decimal;
    position_id: Uint128;
    position_owner: string;
  };
} | {
  claim_liquidations: {
    bid_for: AssetInfo;
    bid_ids?: Uint128[] | null;
  };
} | {
  add_queue: {
    bid_for: AssetInfo;
    bid_threshold: Uint256;
    max_premium: Uint128;
  };
} | {
  update_queue: {
    bid_for: AssetInfo;
    bid_threshold?: Uint256 | null;
    max_premium?: Uint128 | null;
  };
} | {
  update_config: {
    maximum_waiting_bids?: number | null;
    minimum_bid?: Uint128 | null;
    owner?: string | null;
    waiting_period?: number | null;
  };
};
export type Decimal = string;
export interface BidInput {
  bid_for: AssetInfo;
  liq_premium: number;
}
export interface InstantiateMsg {
  maximum_waiting_bids: number;
  minimum_bid: Uint128;
  owner?: string | null;
  positions_contract: string;
  waiting_period: number;
}
export interface LiquidatibleResponse {
  leftover_collateral: string;
  total_debt_repaid: string;
}
export type QueryMsg = {
  config: {};
} | {
  bid: {
    bid_for: AssetInfo;
    bid_id: Uint128;
  };
} | {
  bids_by_user: {
    bid_for: AssetInfo;
    limit?: number | null;
    start_after?: Uint128 | null;
    user: string;
  };
} | {
  queue: {
    bid_for: AssetInfo;
  };
} | {
  queues: {
    limit?: number | null;
    start_after?: AssetInfo | null;
  };
} | {
  check_liquidatible: {
    bid_for: AssetInfo;
    collateral_amount: Uint256;
    collateral_price: Decimal;
    credit_info: AssetInfo;
    credit_price: Decimal;
  };
} | {
  user_claims: {
    user: string;
  };
} | {
  premium_slot: {
    bid_for: AssetInfo;
    premium: number;
  };
} | {
  premium_slots: {
    bid_for: AssetInfo;
    limit?: number | null;
    start_after?: number | null;
  };
};
export interface QueueResponse {
  bid_asset: Asset;
  bid_threshold: Uint256;
  current_bid_id: Uint128;
  max_premium: Uint128;
}
export interface Asset {
  amount: Uint128;
  info: AssetInfo;
}
export interface SlotResponse {
  bids: Bid[];
  current_epoch: Uint128;
  current_scale: Uint128;
  liq_premium: string;
  product_snapshot: string;
  residue_bid: string;
  residue_collateral: string;
  sum_snapshot: string;
  total_bid_amount: string;
  waiting_bids: Bid[];
}
export interface Bid {
  amount: Uint256;
  epoch_snapshot: Uint128;
  id: Uint128;
  liq_premium: number;
  pending_liquidated_collateral: Uint256;
  product_snapshot: Decimal256;
  scale_snapshot: Uint128;
  sum_snapshot: Decimal256;
  user: Addr;
  wait_end?: number | null;
}
export type LiquidationQueueExecuteMsg = ExecuteMsg;
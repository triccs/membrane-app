/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Uint256, Uint128, Decimal256, BidResponse, ClaimsResponse, AssetInfo, Addr, Config, ExecuteMsg, Decimal, BidInput, InstantiateMsg, LiquidatibleResponse, QueryMsg, QueueResponse, Asset, SlotResponse, Bid } from "./LiquidationQueue.types";
export interface LiquidationQueueReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  bid: ({
    bidFor,
    bidId
  }: {
    bidFor: AssetInfo;
    bidId: Uint128;
  }) => Promise<BidResponse>;
  bidsByUser: ({
    bidFor,
    limit,
    startAfter,
    user
  }: {
    bidFor: AssetInfo;
    limit?: number;
    startAfter?: Uint128;
    user: string;
  }) => Promise<BidsByUserResponse>;
  queue: ({
    bidFor
  }: {
    bidFor: AssetInfo;
  }) => Promise<QueueResponse>;
  queues: ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: AssetInfo;
  }) => Promise<QueuesResponse>;
  checkLiquidatible: ({
    bidFor,
    collateralAmount,
    collateralPrice,
    creditInfo,
    creditPrice
  }: {
    bidFor: AssetInfo;
    collateralAmount: Uint256;
    collateralPrice: Decimal;
    creditInfo: AssetInfo;
    creditPrice: Decimal;
  }) => Promise<CheckLiquidatibleResponse>;
  userClaims: ({
    user
  }: {
    user: string;
  }) => Promise<UserClaimsResponse>;
  premiumSlot: ({
    bidFor,
    premium
  }: {
    bidFor: AssetInfo;
    premium: number;
  }) => Promise<PremiumSlotResponse>;
  premiumSlots: ({
    bidFor,
    limit,
    startAfter
  }: {
    bidFor: AssetInfo;
    limit?: number;
    startAfter?: number;
  }) => Promise<PremiumSlotsResponse>;
}
export class LiquidationQueueQueryClient implements LiquidationQueueReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.bid = this.bid.bind(this);
    this.bidsByUser = this.bidsByUser.bind(this);
    this.queue = this.queue.bind(this);
    this.queues = this.queues.bind(this);
    this.checkLiquidatible = this.checkLiquidatible.bind(this);
    this.userClaims = this.userClaims.bind(this);
    this.premiumSlot = this.premiumSlot.bind(this);
    this.premiumSlots = this.premiumSlots.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  bid = async ({
    bidFor,
    bidId
  }: {
    bidFor: AssetInfo;
    bidId: Uint128;
  }): Promise<BidResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      bid: {
        bid_for: bidFor,
        bid_id: bidId
      }
    });
  };
  bidsByUser = async ({
    bidFor,
    limit,
    startAfter,
    user
  }: {
    bidFor: AssetInfo;
    limit?: number;
    startAfter?: Uint128;
    user: string;
  }): Promise<BidsByUserResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      bids_by_user: {
        bid_for: bidFor,
        limit,
        start_after: startAfter,
        user
      }
    });
  };
  queue = async ({
    bidFor
  }: {
    bidFor: AssetInfo;
  }): Promise<QueueResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      queue: {
        bid_for: bidFor
      }
    });
  };
  queues = async ({
    limit,
    startAfter
  }: {
    limit?: number;
    startAfter?: AssetInfo;
  }): Promise<QueuesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      queues: {
        limit,
        start_after: startAfter
      }
    });
  };
  checkLiquidatible = async ({
    bidFor,
    collateralAmount,
    collateralPrice,
    creditInfo,
    creditPrice
  }: {
    bidFor: AssetInfo;
    collateralAmount: Uint256;
    collateralPrice: Decimal;
    creditInfo: AssetInfo;
    creditPrice: Decimal;
  }): Promise<CheckLiquidatibleResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      check_liquidatible: {
        bid_for: bidFor,
        collateral_amount: collateralAmount,
        collateral_price: collateralPrice,
        credit_info: creditInfo,
        credit_price: creditPrice
      }
    });
  };
  userClaims = async ({
    user
  }: {
    user: string;
  }): Promise<UserClaimsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_claims: {
        user
      }
    });
  };
  premiumSlot = async ({
    bidFor,
    premium
  }: {
    bidFor: AssetInfo;
    premium: number;
  }): Promise<PremiumSlotResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      premium_slot: {
        bid_for: bidFor,
        premium
      }
    });
  };
  premiumSlots = async ({
    bidFor,
    limit,
    startAfter
  }: {
    bidFor: AssetInfo;
    limit?: number;
    startAfter?: number;
  }): Promise<PremiumSlotsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      premium_slots: {
        bid_for: bidFor,
        limit,
        start_after: startAfter
      }
    });
  };
}
export interface LiquidationQueueInterface extends LiquidationQueueReadOnlyInterface {
  contractAddress: string;
  sender: string;
  submitBid: ({
    bidInput,
    bidOwner
  }: {
    bidInput: BidInput;
    bidOwner?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  retractBid: ({
    amount,
    bidFor,
    bidId
  }: {
    amount?: Uint256;
    bidFor: AssetInfo;
    bidId: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  liquidate: ({
    bidFor,
    collateralAmount,
    collateralPrice,
    creditPrice,
    positionId,
    positionOwner
  }: {
    bidFor: AssetInfo;
    collateralAmount: Uint256;
    collateralPrice: Decimal;
    creditPrice: Decimal;
    positionId: Uint128;
    positionOwner: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimLiquidations: ({
    bidFor,
    bidIds
  }: {
    bidFor: AssetInfo;
    bidIds?: Uint128[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addQueue: ({
    bidFor,
    bidThreshold,
    maxPremium
  }: {
    bidFor: AssetInfo;
    bidThreshold: Uint256;
    maxPremium: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateQueue: ({
    bidFor,
    bidThreshold,
    maxPremium
  }: {
    bidFor: AssetInfo;
    bidThreshold?: Uint256;
    maxPremium?: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    maximumWaitingBids,
    minimumBid,
    owner,
    waitingPeriod
  }: {
    maximumWaitingBids?: number;
    minimumBid?: Uint128;
    owner?: string;
    waitingPeriod?: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class LiquidationQueueClient extends LiquidationQueueQueryClient implements LiquidationQueueInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.submitBid = this.submitBid.bind(this);
    this.retractBid = this.retractBid.bind(this);
    this.liquidate = this.liquidate.bind(this);
    this.claimLiquidations = this.claimLiquidations.bind(this);
    this.addQueue = this.addQueue.bind(this);
    this.updateQueue = this.updateQueue.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
  }

  submitBid = async ({
    bidInput,
    bidOwner
  }: {
    bidInput: BidInput;
    bidOwner?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      submit_bid: {
        bid_input: bidInput,
        bid_owner: bidOwner
      }
    }, fee, memo, _funds);
  };
  retractBid = async ({
    amount,
    bidFor,
    bidId
  }: {
    amount?: Uint256;
    bidFor: AssetInfo;
    bidId: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      retract_bid: {
        amount,
        bid_for: bidFor,
        bid_id: bidId
      }
    }, fee, memo, _funds);
  };
  liquidate = async ({
    bidFor,
    collateralAmount,
    collateralPrice,
    creditPrice,
    positionId,
    positionOwner
  }: {
    bidFor: AssetInfo;
    collateralAmount: Uint256;
    collateralPrice: Decimal;
    creditPrice: Decimal;
    positionId: Uint128;
    positionOwner: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      liquidate: {
        bid_for: bidFor,
        collateral_amount: collateralAmount,
        collateral_price: collateralPrice,
        credit_price: creditPrice,
        position_id: positionId,
        position_owner: positionOwner
      }
    }, fee, memo, _funds);
  };
  claimLiquidations = async ({
    bidFor,
    bidIds
  }: {
    bidFor: AssetInfo;
    bidIds?: Uint128[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_liquidations: {
        bid_for: bidFor,
        bid_ids: bidIds
      }
    }, fee, memo, _funds);
  };
  addQueue = async ({
    bidFor,
    bidThreshold,
    maxPremium
  }: {
    bidFor: AssetInfo;
    bidThreshold: Uint256;
    maxPremium: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_queue: {
        bid_for: bidFor,
        bid_threshold: bidThreshold,
        max_premium: maxPremium
      }
    }, fee, memo, _funds);
  };
  updateQueue = async ({
    bidFor,
    bidThreshold,
    maxPremium
  }: {
    bidFor: AssetInfo;
    bidThreshold?: Uint256;
    maxPremium?: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_queue: {
        bid_for: bidFor,
        bid_threshold: bidThreshold,
        max_premium: maxPremium
      }
    }, fee, memo, _funds);
  };
  updateConfig = async ({
    maximumWaitingBids,
    minimumBid,
    owner,
    waitingPeriod
  }: {
    maximumWaitingBids?: number;
    minimumBid?: Uint128;
    owner?: string;
    waitingPeriod?: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        maximum_waiting_bids: maximumWaitingBids,
        minimum_bid: minimumBid,
        owner,
        waiting_period: waitingPeriod
      }
    }, fee, memo, _funds);
  };
}
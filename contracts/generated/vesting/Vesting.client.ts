/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { Uint128, AllocationResponse, VestingPeriod, Addr, Config, ExecuteMsg, CosmosMsgForEmpty, BankMsg, StakingMsg, DistributionMsg, Binary, IbcMsg, Timestamp, Uint64, WasmMsg, GovMsg, VoteOption, ProposalVoteOption, ProposalMessage, Coin, Empty, IbcTimeout, IbcTimeoutBlock, InstantiateMsg, QueryMsg, AssetInfo, RecipientResponse, Allocation, Asset, RecipientsResponse, UnlockedResponse } from "./Vesting.types";
export interface VestingReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  allocation: ({
    recipient
  }: {
    recipient: string;
  }) => Promise<AllocationResponse>;
  unlockedTokens: ({
    recipient
  }: {
    recipient: string;
  }) => Promise<UnlockedTokensResponse>;
  recipient: ({
    recipient
  }: {
    recipient: string;
  }) => Promise<RecipientResponse>;
  recipients: () => Promise<RecipientsResponse>;
}
export class VestingQueryClient implements VestingReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.allocation = this.allocation.bind(this);
    this.unlockedTokens = this.unlockedTokens.bind(this);
    this.recipient = this.recipient.bind(this);
    this.recipients = this.recipients.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  allocation = async ({
    recipient
  }: {
    recipient: string;
  }): Promise<AllocationResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      allocation: {
        recipient
      }
    });
  };
  unlockedTokens = async ({
    recipient
  }: {
    recipient: string;
  }): Promise<UnlockedTokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      unlocked_tokens: {
        recipient
      }
    });
  };
  recipient = async ({
    recipient
  }: {
    recipient: string;
  }): Promise<RecipientResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      recipient: {
        recipient
      }
    });
  };
  recipients = async (): Promise<RecipientsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      recipients: {}
    });
  };
}
export interface VestingInterface extends VestingReadOnlyInterface {
  contractAddress: string;
  sender: string;
  addRecipient: ({
    recipient
  }: {
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removeRecipient: ({
    recipient
  }: {
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addAllocation: ({
    allocation,
    recipient,
    vestingPeriod
  }: {
    allocation: Uint128;
    recipient: string;
    vestingPeriod?: VestingPeriod;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  withdrawUnlocked: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimFeesforContract: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimFeesforRecipient: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  submitProposal: ({
    description,
    expedited,
    link,
    messages,
    title
  }: {
    description: string;
    expedited: boolean;
    link?: string;
    messages?: ProposalMessage[];
    title: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  castVote: ({
    proposalId,
    vote
  }: {
    proposalId: number;
    vote: ProposalVoteOption;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    additionalAllocation,
    mbrnDenom,
    osmosisProxy,
    owner,
    stakingContract
  }: {
    additionalAllocation?: Uint128;
    mbrnDenom?: string;
    osmosisProxy?: string;
    owner?: string;
    stakingContract?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class VestingClient extends VestingQueryClient implements VestingInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.addRecipient = this.addRecipient.bind(this);
    this.removeRecipient = this.removeRecipient.bind(this);
    this.addAllocation = this.addAllocation.bind(this);
    this.withdrawUnlocked = this.withdrawUnlocked.bind(this);
    this.claimFeesforContract = this.claimFeesforContract.bind(this);
    this.claimFeesforRecipient = this.claimFeesforRecipient.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
    this.castVote = this.castVote.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
  }

  addRecipient = async ({
    recipient
  }: {
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_recipient: {
        recipient
      }
    }, fee, memo, _funds);
  };
  removeRecipient = async ({
    recipient
  }: {
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_recipient: {
        recipient
      }
    }, fee, memo, _funds);
  };
  addAllocation = async ({
    allocation,
    recipient,
    vestingPeriod
  }: {
    allocation: Uint128;
    recipient: string;
    vestingPeriod?: VestingPeriod;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_allocation: {
        allocation,
        recipient,
        vesting_period: vestingPeriod
      }
    }, fee, memo, _funds);
  };
  withdrawUnlocked = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw_unlocked: {}
    }, fee, memo, _funds);
  };
  claimFeesforContract = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_feesfor_contract: {}
    }, fee, memo, _funds);
  };
  claimFeesforRecipient = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_feesfor_recipient: {}
    }, fee, memo, _funds);
  };
  submitProposal = async ({
    description,
    expedited,
    link,
    messages,
    title
  }: {
    description: string;
    expedited: boolean;
    link?: string;
    messages?: ProposalMessage[];
    title: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      submit_proposal: {
        description,
        expedited,
        link,
        messages,
        title
      }
    }, fee, memo, _funds);
  };
  castVote = async ({
    proposalId,
    vote
  }: {
    proposalId: number;
    vote: ProposalVoteOption;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      cast_vote: {
        proposal_id: proposalId,
        vote
      }
    }, fee, memo, _funds);
  };
  updateConfig = async ({
    additionalAllocation,
    mbrnDenom,
    osmosisProxy,
    owner,
    stakingContract
  }: {
    additionalAllocation?: Uint128;
    mbrnDenom?: string;
    osmosisProxy?: string;
    owner?: string;
    stakingContract?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        additional_allocation: additionalAllocation,
        mbrn_denom: mbrnDenom,
        osmosis_proxy: osmosisProxy,
        owner,
        staking_contract: stakingContract
      }
    }, fee, memo, _funds);
  };
}
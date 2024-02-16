/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { Uint128, Decimal, Addr, Config, ExecuteMsg, CosmosMsgForEmpty, BankMsg, StakingMsg, DistributionMsg, Binary, IbcMsg, Timestamp, Uint64, WasmMsg, GovMsg, VoteOption, ProposalVoteOption, ProposalMessage, Coin, Empty, IbcTimeout, IbcTimeoutBlock, UpdateConfig, InstantiateMsg, ProposalStatus, ProposalListResponse, ProposalResponse, ProposalVotesResponse, Proposal, QueryMsg } from "./Governance.types";
export interface GovernanceReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  activeProposals: ({
    limit,
    start
  }: {
    limit?: number;
    start?: number;
  }) => Promise<ActiveProposalsResponse>;
  pendingProposals: ({
    limit,
    start
  }: {
    limit?: number;
    start?: number;
  }) => Promise<PendingProposalsResponse>;
  proposalVoters: ({
    limit,
    proposalId,
    specificUser,
    start,
    voteOption
  }: {
    limit?: number;
    proposalId: number;
    specificUser?: string;
    start?: number;
    voteOption: ProposalVoteOption;
  }) => Promise<ProposalVotersResponse>;
  proposal: ({
    proposalId
  }: {
    proposalId: number;
  }) => Promise<ProposalResponse>;
  proposalVotes: ({
    proposalId
  }: {
    proposalId: number;
  }) => Promise<ProposalVotesResponse>;
  userVotingPower: ({
    proposalId,
    user,
    vesting
  }: {
    proposalId: number;
    user: string;
    vesting: boolean;
  }) => Promise<UserVotingPowerResponse>;
  totalVotingPower: ({
    proposalId
  }: {
    proposalId: number;
  }) => Promise<TotalVotingPowerResponse>;
}
export class GovernanceQueryClient implements GovernanceReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.activeProposals = this.activeProposals.bind(this);
    this.pendingProposals = this.pendingProposals.bind(this);
    this.proposalVoters = this.proposalVoters.bind(this);
    this.proposal = this.proposal.bind(this);
    this.proposalVotes = this.proposalVotes.bind(this);
    this.userVotingPower = this.userVotingPower.bind(this);
    this.totalVotingPower = this.totalVotingPower.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  activeProposals = async ({
    limit,
    start
  }: {
    limit?: number;
    start?: number;
  }): Promise<ActiveProposalsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      active_proposals: {
        limit,
        start
      }
    });
  };
  pendingProposals = async ({
    limit,
    start
  }: {
    limit?: number;
    start?: number;
  }): Promise<PendingProposalsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pending_proposals: {
        limit,
        start
      }
    });
  };
  proposalVoters = async ({
    limit,
    proposalId,
    specificUser,
    start,
    voteOption
  }: {
    limit?: number;
    proposalId: number;
    specificUser?: string;
    start?: number;
    voteOption: ProposalVoteOption;
  }): Promise<ProposalVotersResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_voters: {
        limit,
        proposal_id: proposalId,
        specific_user: specificUser,
        start,
        vote_option: voteOption
      }
    });
  };
  proposal = async ({
    proposalId
  }: {
    proposalId: number;
  }): Promise<ProposalResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal: {
        proposal_id: proposalId
      }
    });
  };
  proposalVotes = async ({
    proposalId
  }: {
    proposalId: number;
  }): Promise<ProposalVotesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_votes: {
        proposal_id: proposalId
      }
    });
  };
  userVotingPower = async ({
    proposalId,
    user,
    vesting
  }: {
    proposalId: number;
    user: string;
    vesting: boolean;
  }): Promise<UserVotingPowerResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_voting_power: {
        proposal_id: proposalId,
        user,
        vesting
      }
    });
  };
  totalVotingPower = async ({
    proposalId
  }: {
    proposalId: number;
  }): Promise<TotalVotingPowerResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_voting_power: {
        proposal_id: proposalId
      }
    });
  };
}
export interface GovernanceInterface extends GovernanceReadOnlyInterface {
  contractAddress: string;
  sender: string;
  submitProposal: ({
    description,
    expedited,
    link,
    messages,
    recipient,
    title
  }: {
    description: string;
    expedited: boolean;
    link?: string;
    messages?: ProposalMessage[];
    recipient?: string;
    title: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  castVote: ({
    proposalId,
    recipient,
    vote
  }: {
    proposalId: number;
    recipient?: string;
    vote: ProposalVoteOption;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  endProposal: ({
    proposalId
  }: {
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  checkMessages: ({
    messages
  }: {
    messages: ProposalMessage[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  checkMessagesPassed: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeProposal: ({
    proposalId
  }: {
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removeCompletedProposal: ({
    proposalId
  }: {
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    expeditedProposalVotingPeriod,
    mbrnDenom,
    minimumTotalStake,
    proposalEffectiveDelay,
    proposalExpirationPeriod,
    proposalRequiredQuorum,
    proposalRequiredStake,
    proposalRequiredThreshold,
    proposalVotingPeriod,
    quadraticVoting,
    stakingContract,
    vestingContractAddr,
    vestingVotingPowerMultiplier,
    whitelistAdd,
    whitelistRemove
  }: {
    expeditedProposalVotingPeriod?: number;
    mbrnDenom?: string;
    minimumTotalStake?: Uint128;
    proposalEffectiveDelay?: number;
    proposalExpirationPeriod?: number;
    proposalRequiredQuorum?: string;
    proposalRequiredStake?: number;
    proposalRequiredThreshold?: string;
    proposalVotingPeriod?: number;
    quadraticVoting?: boolean;
    stakingContract?: string;
    vestingContractAddr?: string;
    vestingVotingPowerMultiplier?: Decimal;
    whitelistAdd?: string[];
    whitelistRemove?: string[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class GovernanceClient extends GovernanceQueryClient implements GovernanceInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.submitProposal = this.submitProposal.bind(this);
    this.castVote = this.castVote.bind(this);
    this.endProposal = this.endProposal.bind(this);
    this.checkMessages = this.checkMessages.bind(this);
    this.checkMessagesPassed = this.checkMessagesPassed.bind(this);
    this.executeProposal = this.executeProposal.bind(this);
    this.removeCompletedProposal = this.removeCompletedProposal.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
  }

  submitProposal = async ({
    description,
    expedited,
    link,
    messages,
    recipient,
    title
  }: {
    description: string;
    expedited: boolean;
    link?: string;
    messages?: ProposalMessage[];
    recipient?: string;
    title: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      submit_proposal: {
        description,
        expedited,
        link,
        messages,
        recipient,
        title
      }
    }, fee, memo, _funds);
  };
  castVote = async ({
    proposalId,
    recipient,
    vote
  }: {
    proposalId: number;
    recipient?: string;
    vote: ProposalVoteOption;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      cast_vote: {
        proposal_id: proposalId,
        recipient,
        vote
      }
    }, fee, memo, _funds);
  };
  endProposal = async ({
    proposalId
  }: {
    proposalId: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      end_proposal: {
        proposal_id: proposalId
      }
    }, fee, memo, _funds);
  };
  checkMessages = async ({
    messages
  }: {
    messages: ProposalMessage[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      check_messages: {
        messages
      }
    }, fee, memo, _funds);
  };
  checkMessagesPassed = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      check_messages_passed: {}
    }, fee, memo, _funds);
  };
  executeProposal = async ({
    proposalId
  }: {
    proposalId: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_proposal: {
        proposal_id: proposalId
      }
    }, fee, memo, _funds);
  };
  removeCompletedProposal = async ({
    proposalId
  }: {
    proposalId: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_completed_proposal: {
        proposal_id: proposalId
      }
    }, fee, memo, _funds);
  };
  updateConfig = async ({
    expeditedProposalVotingPeriod,
    mbrnDenom,
    minimumTotalStake,
    proposalEffectiveDelay,
    proposalExpirationPeriod,
    proposalRequiredQuorum,
    proposalRequiredStake,
    proposalRequiredThreshold,
    proposalVotingPeriod,
    quadraticVoting,
    stakingContract,
    vestingContractAddr,
    vestingVotingPowerMultiplier,
    whitelistAdd,
    whitelistRemove
  }: {
    expeditedProposalVotingPeriod?: number;
    mbrnDenom?: string;
    minimumTotalStake?: Uint128;
    proposalEffectiveDelay?: number;
    proposalExpirationPeriod?: number;
    proposalRequiredQuorum?: string;
    proposalRequiredStake?: number;
    proposalRequiredThreshold?: string;
    proposalVotingPeriod?: number;
    quadraticVoting?: boolean;
    stakingContract?: string;
    vestingContractAddr?: string;
    vestingVotingPowerMultiplier?: Decimal;
    whitelistAdd?: string[];
    whitelistRemove?: string[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        expedited_proposal_voting_period: expeditedProposalVotingPeriod,
        mbrn_denom: mbrnDenom,
        minimum_total_stake: minimumTotalStake,
        proposal_effective_delay: proposalEffectiveDelay,
        proposal_expiration_period: proposalExpirationPeriod,
        proposal_required_quorum: proposalRequiredQuorum,
        proposal_required_stake: proposalRequiredStake,
        proposal_required_threshold: proposalRequiredThreshold,
        proposal_voting_period: proposalVotingPeriod,
        quadratic_voting: quadraticVoting,
        staking_contract: stakingContract,
        vesting_contract_addr: vestingContractAddr,
        vesting_voting_power_multiplier: vestingVotingPowerMultiplier,
        whitelist_add: whitelistAdd,
        whitelist_remove: whitelistRemove
      }
    }, fee, memo, _funds);
  };
}
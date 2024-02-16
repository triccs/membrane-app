/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { toUtf8 } from "@cosmjs/encoding";
import { Uint128, Decimal, Addr, Config, ExecuteMsg, CosmosMsgForEmpty, BankMsg, StakingMsg, DistributionMsg, Binary, IbcMsg, Timestamp, Uint64, WasmMsg, GovMsg, VoteOption, ProposalVoteOption, ProposalMessage, Coin, Empty, IbcTimeout, IbcTimeoutBlock, UpdateConfig, InstantiateMsg, ProposalStatus, ProposalListResponse, ProposalResponse, ProposalVotesResponse, Proposal, QueryMsg } from "./Governance.types";
export interface GovernanceMsg {
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
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  castVote: ({
    proposalId,
    recipient,
    vote
  }: {
    proposalId: number;
    recipient?: string;
    vote: ProposalVoteOption;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  endProposal: ({
    proposalId
  }: {
    proposalId: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  checkMessages: ({
    messages
  }: {
    messages: ProposalMessage[];
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  checkMessagesPassed: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
  executeProposal: ({
    proposalId
  }: {
    proposalId: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  removeCompletedProposal: ({
    proposalId
  }: {
    proposalId: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
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
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
}
export class GovernanceMsgComposer implements GovernanceMsg {
  sender: string;
  contractAddress: string;

  constructor(sender: string, contractAddress: string) {
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

  submitProposal = ({
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
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          submit_proposal: {
            description,
            expedited,
            link,
            messages,
            recipient,
            title
          }
        })),
        funds: _funds
      })
    };
  };
  castVote = ({
    proposalId,
    recipient,
    vote
  }: {
    proposalId: number;
    recipient?: string;
    vote: ProposalVoteOption;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          cast_vote: {
            proposal_id: proposalId,
            recipient,
            vote
          }
        })),
        funds: _funds
      })
    };
  };
  endProposal = ({
    proposalId
  }: {
    proposalId: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          end_proposal: {
            proposal_id: proposalId
          }
        })),
        funds: _funds
      })
    };
  };
  checkMessages = ({
    messages
  }: {
    messages: ProposalMessage[];
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          check_messages: {
            messages
          }
        })),
        funds: _funds
      })
    };
  };
  checkMessagesPassed = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          check_messages_passed: {}
        })),
        funds: _funds
      })
    };
  };
  executeProposal = ({
    proposalId
  }: {
    proposalId: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          execute_proposal: {
            proposal_id: proposalId
          }
        })),
        funds: _funds
      })
    };
  };
  removeCompletedProposal = ({
    proposalId
  }: {
    proposalId: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          remove_completed_proposal: {
            proposal_id: proposalId
          }
        })),
        funds: _funds
      })
    };
  };
  updateConfig = ({
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
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
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
        })),
        funds: _funds
      })
    };
  };
}
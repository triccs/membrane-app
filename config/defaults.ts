import { GeneratedType, Registry } from '@cosmjs/proto-signing'
import { AminoTypes } from '@cosmjs/stargate'
import {
  cosmosAminoConverters,
  cosmosProtoRegistry,
  cosmwasmAminoConverters,
  cosmwasmProtoRegistry,
  ibcAminoConverters,
  ibcProtoRegistry,
  osmosisAminoConverters,
  osmosisProtoRegistry,
} from 'osmojs'

const protoRegistry: ReadonlyArray<[string, GeneratedType]> = [
  ...cosmosProtoRegistry,
  ...cosmwasmProtoRegistry,
  ...ibcProtoRegistry,
  ...osmosisProtoRegistry,
]

const aminoConverters = {
  ...cosmosAminoConverters,
  ...cosmwasmAminoConverters,
  ...ibcAminoConverters,
  ...osmosisAminoConverters,
}

export const registry = new Registry(protoRegistry)
export const aminoTypes = new AminoTypes(aminoConverters)

export const rpcUrl =
  'https://g.w.lavanet.xyz:443/gateway/cos3/rpc-http/bb6d2019c50124ec4fdb78498bc50573'

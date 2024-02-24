import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate'

/**
 * Decode Msgs encoded msgs from base64 to utf-8
 *
 * @param msgs Encoded msgs
 * @returns msgs Decoded msgs
 */

export const decodeMsgs = (msgs: MsgExecuteContractEncodeObject[] = []) => {
  return [...msgs].map((msg) => {
    const value = { ...msg.value }
    value.msg = JSON.parse(Buffer.from(value.msg, 'base64').toString('utf-8'))
    return {
      ...msg,
      value,
    }
  })
}

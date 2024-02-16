import BigNumber from 'bignumber.js'

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-10, 20],
})

export const num = (value: BigNumber.Value = '0'): BigNumber => {
  return new BigNumber(value)
}

export const isGreaterThanZero = (val: number | string | undefined) => {
  return new BigNumber(val || 0).gt(0)
}

export const shiftDigits = (num: string | number, places: number, decimalPlaces?: number) => {
  return new BigNumber(num)
    .shiftedBy(places)
    .decimalPlaces(decimalPlaces || 6)
    .toString()
}

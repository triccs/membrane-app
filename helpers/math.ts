import BigNumber from 'bignumber.js'

export const shiftDigits = (
  value: string | number | undefined = 0,
  places: number,
  decimalPlaces: number = 6,
) => {
  try {
    return new BigNumber(value)?.shiftedBy(places).decimalPlaces(decimalPlaces)
  } catch (e) {
    return new BigNumber(0)
  }
}

export const sum = (...args: string[]) => {
  return args.reduce((prev, cur) => prev.plus(cur), new BigNumber(0))
}

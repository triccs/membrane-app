export const parseError = (error: Error) => {
  const customErrors = [
    { regex: /insufficient funds/i, message: 'Insufficient funds' },
    { regex: /overflow: cannot sub with/i, message: 'Insufficient funds' },
    { regex: /max spread assertion/i, message: 'Try increasing slippage' },
    { regex: /request rejected/i, message: 'User denied' },
    { regex: /ran out of ticks for pool/i, message: 'Low liquidity, try lower amount' },
    { regex: /no liquidity in pool/i, message: 'No liquidity available' },
    { regex: /token amount calculated/i, message: 'Try increasing slippage' },
    { regex: /Must stake at least 1 MBRN/i, message: 'Must stake at least 1 MBRN' },
    { regex: /is below minimum/i, message: 'Minimum 100 CDT to mint' },
    { regex: /invalid coin/i, message: 'Invalid coins provided' },
  ]

  const errorMessage = error?.message || ''

  const matchedError = customErrors.find(({ regex }) => regex.test(errorMessage))
  return matchedError ? matchedError.message : 'Something went wrong, please try again'
}

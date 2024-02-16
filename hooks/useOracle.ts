import { getOraclePrices } from '@/services/oracle'
import { useQuery } from '@tanstack/react-query'

export const useOraclePrice = () => {
  return useQuery({
    queryKey: ['oraclePrice'],
    queryFn: async () => {
      return getOraclePrices()
    },
  })
}

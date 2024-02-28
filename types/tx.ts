import useSimulate from '@/hooks/useSimulate'
import useTransaction from '@/hooks/useTransaction'

export type Action = {
  simulate: ReturnType<typeof useSimulate>
  tx: ReturnType<typeof useTransaction>
}

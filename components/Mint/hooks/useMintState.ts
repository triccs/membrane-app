import { Asset } from '@/helpers/chain'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AssetWithBalance } from './useComboBalance'

type MintState = {
  assets : AssetWithBalance[]
  ltvSlider? : number

}

type Store =  {
  mintState: MintState
  setMintState: (partialState: Partial<MintState>) => void
  reset: () => void
}

const initialState: MintState = {
  assets: [],
  ltvSlider: 0
}

type Config = {
  name: string
}

// @ts-ignore
const store = (set) => ({
  mintState: initialState,
  setMintState: (partialState: Partial<MintState>) =>
    set(
      (state: Store) => ({ mintState: { ...state.mintState, ...partialState } }),
      false,
      `@update/${Object.keys(partialState).join(',')}`,
    ),
  reset: () => set((state: Store) => ({ ...state, ...initialState }), false, '@reset'),
})

const useMintState = create<Store>(devtools(store, { name: 'mintState' }))

export default useMintState

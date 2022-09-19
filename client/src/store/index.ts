import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import IGlobal from './store.interface'

const useStore = create<IGlobal>()(
  devtools(
    persist(
      (_) => ({
        authUser: null
      }),
      {
        name: 'user-storage'
      }
    )
  )
)

export default useStore

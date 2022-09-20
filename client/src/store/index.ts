import create from 'zustand'
import { persist } from 'zustand/middleware'
import IGlobal from '../interface/IGlobal'
import IUser from '../interface/IUser'

const useStore = create<IGlobal>()(
  persist(
    (set) => ({
      user: null,
      loginUser: (user: IUser) =>
        set((state) => ({
          ...state,
          user: user
        })),
      logoutUser: () =>
        set((state) => ({
          ...state,
          user: null
        }))
    }),
    {
      name: 'user-store'
    }
  )
)

export default useStore

import create from 'zustand'
import IGlobal from '../interface/IGlobal'
import IUser from '../interface/IUser'

const useStore = create<IGlobal>((set) => ({
  user: null,
  // NOTE: set user status on login and logout
  loginUser: (user: IUser) =>
    set((state) => ({
      ...state,
      user: user
    }))
}))

export default useStore

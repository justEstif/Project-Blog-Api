import create from 'zustand'
import IGlobal from '../interface/IGlobal'
import IUser from '../interface/IUser'

const useStore = create<IGlobal>((set) => ({
  user: null,
  setUser: (user: IUser | null) =>
    set((state) => ({
      ...state,
      user: user
    }))

  // NOTE: to log out just set the user to null
}))

export default useStore

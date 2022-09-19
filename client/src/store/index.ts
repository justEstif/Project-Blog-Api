import create from 'zustand'
import IGlobal from '../interface/IGlobal'
import IUser from '../interface/IUser'
import { loginUser } from '../services/api.auth'

const useStore = create<IGlobal>((set) => ({
  user: null,
  loginUser: loginUser,
  // NOTE: to log out just set the user to null
  setUser: (user: IUser | null) => set((states) => ({ ...states, user }))
}))

export default useStore

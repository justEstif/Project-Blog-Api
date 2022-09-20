import IUser from '../interface/IUser'

interface IGlobal {
  user: IUser | null
  loginUser: (user: IUser) => void
  logoutUser: () => void
}

export default IGlobal

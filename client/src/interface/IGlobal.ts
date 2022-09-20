import IUser from '../interface/IUser'

interface IGlobal {
  user: IUser | null
  loginUser: (user: IUser) => void
}

export default IGlobal

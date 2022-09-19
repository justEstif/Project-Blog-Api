import IUser from '../interface/IUser'

interface IGlobal {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export default IGlobal

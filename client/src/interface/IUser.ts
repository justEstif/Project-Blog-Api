interface IUser {
  token: {
    token: string
    expiresIn: number
  }
  id: string
  email: string
  owner: boolean
  username: string
}

export default IUser

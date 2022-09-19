interface IAuthUser {
  token: {
    token: string
    expiresIn: number
  }
  user: {
    id: string
    email: string
    owner: boolean
    username: string
  }
}

export default IAuthUser

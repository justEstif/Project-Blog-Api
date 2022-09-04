interface IUser {
  email: string
  username: string
  password: string | undefined
  owner: boolean
}

export default IUser

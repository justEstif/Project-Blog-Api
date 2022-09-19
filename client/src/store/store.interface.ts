interface IGlobal {
  authUser: {
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
  } | null
}

export default IGlobal

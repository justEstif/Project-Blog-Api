import axios from "axios"
import IUserCredentials from "../interface/IUserCredentials"
import IAuthUser from "../interface/IAuthUser"

// TODO: Log in, Log out, Register

export const loggingIn = async ({
  email,
  password
}: IUserCredentials): Promise<IAuthUser> => {
  const urlwithProxy = '/api/login'
  try {
    const response = await axios.post(urlwithProxy, {
      email,
      password
    })
    const data: IAuthUser = response.data
    // TODO: set the authuser store to this data
    // TODO: make sure the data is correct
    return data
  } catch (error) {
    throw error
  }
}

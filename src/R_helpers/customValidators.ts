import { CustomValidator } from 'express-validator'
import { User } from '../models'

const customValidator = (() => {
  interface IEmailField {
    email: string
  }
  interface IUsernameField {
    username: string
  }
  const isEmailValid: CustomValidator = async (value: string) => {
    return checkDuplicate({ email: value })
  }
  const isUsernameValid: CustomValidator = async (value: string) => {
    return checkDuplicate({ username: value })
  }

  const checkDuplicate = async (fieldValue: IEmailField | IUsernameField) => {
    const user = await User.findOne(fieldValue)
    if (user) return Promise.reject()
    else return true
  }

  return {
    isEmailValid,
    isUsernameValid
  }
})()

export default customValidator

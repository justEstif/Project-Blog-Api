interface IProps { }
import { useState } from 'react'
import SHeader from '../../components/SHeader'
import Form from './Form'
const RegisterPage = ({ }: IProps) => {
  // TODO: create custom hook for useRegisterUser
  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">Register</p>
      </SHeader>
      <div>this is the login page</div>
      <Form setRegister=/>
    </>
  )
}

export default RegisterPage

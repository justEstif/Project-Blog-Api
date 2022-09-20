import { useEffect, useState } from 'react'
import SHeader from '../../components/SHeader'
import { loginUser } from '../../services/api.auth'
import Form from './Form'
import IUserCredentials from '../../interface/IUserCredentials'
import useStore from '../../store'
import useLoginUser from '../../hooks/useLoginUser'

interface Props { }

const LoginPage = ({ }: Props) => {
  const { message, setUserCredentials } = useLoginUser()

  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">Login</p>
      </SHeader>

      <Form setUserCredentials={setUserCredentials} message={message} />
    </>
  )
}

export default LoginPage

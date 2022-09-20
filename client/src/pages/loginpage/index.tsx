import { useEffect, useState } from 'react'
import SHeader from '../../components/SHeader'
import { loginUser } from '../../services/api.auth'
import Form from './Form'
import IUserCredentials from '../../interface/IUserCredentials'
import useStore from '../../store'

interface Props {}

const LoginPage = ({}: Props) => {
  const store = useStore((state) => state)
  const [message, setMessage] = useState('')
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: '',
    password: ''
  })

  useEffect(() => {
    const handleLogin = async () => {
      const response = await loginUser(userCredentials)
      if (typeof response === 'string') {
        setMessage(message)
      } else {
        store.loginUser(response)
      }
    }
    if (!(userCredentials.email === '' || userCredentials.password === '')) {
      handleLogin()
    }
  }, [userCredentials])

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

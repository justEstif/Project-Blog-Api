import { useEffect, useState } from 'react'
import SHeader from '../../components/SHeader'
import { loginUser } from '../../services/api.auth'
import Form from './Form'
import IUserCredentials from '../../interface/IUserCredentials'
interface Props {}

const LoginPage = ({}: Props) => {
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: '',
    password: ''
  })

  useEffect(() => {
    // TODO: Handle the userlogin here
    const handleLogin = async () => {
      // NOTE: set the user to the data
      const { user, message } = await loginUser(userCredentials) // returns user, token
      console.log(user)
      console.log(message)
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

      <Form setUserCredentials={setUserCredentials} />
    </>
  )
}

export default LoginPage

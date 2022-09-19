// import tw from 'tailwind-styled-components'
import { useEffect, useState } from 'react'
import SHeader from '../../components/SHeader'
import { loggingIn } from '../../services/api.auth'
import Form from './Form'
import IUserCredentials from '../../interface/IUserCredentials'
interface Props { }

const LoginPage = ({ }: Props) => {
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: '',
    password: ''
  })

  useEffect(() => {
    // TODO: Handle the userlogin here
    const loginUser = async () => {
      const response = await loggingIn(userCredentials) // returns user, token
      console.log(response)
    }
    console.log(userCredentials) // send a post request for jest
    loginUser()
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

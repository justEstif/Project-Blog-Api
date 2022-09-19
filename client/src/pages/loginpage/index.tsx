// import tw from 'tailwind-styled-components'
import { useEffect, useState } from 'react'
import SHeader from '../../components/SHeader'
import Form from './Form'
import { IUserCredentials } from './interface'
interface Props {}

const LoginPage = ({}: Props) => {
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: '',
    password: ''
  })

  useEffect(() => {
    console.log(userCredentials) // send a post request for jest
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

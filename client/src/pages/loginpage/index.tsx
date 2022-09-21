import SHeader from '../../components/SHeader'
import Form from './Form'
import useLoginUser from '../../hooks/useLoginUser'

interface IProps { }

const LoginPage = ({ }: IProps) => {
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

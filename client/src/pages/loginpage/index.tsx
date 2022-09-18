// import tw from 'tailwind-styled-components'
import SHeader from '../../components/SHeader'
import Form from './Form'
interface Props {}

const LoginPage = ({}: Props) => {
  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">Login</p>
      </SHeader>

      <div>
        <Form />
      </div>
    </>
  )
}

export default LoginPage

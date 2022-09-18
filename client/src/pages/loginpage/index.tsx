import tw from 'tailwind-styled-components'
import SHeader from "../../components/SHeader"
interface Props {}

const LoginPage = ({}: Props) => {
  const SHeader = tw.header`
    flex
    flex-col
    gap-8
    text-center
    tracking-wider
    leading-5
    mb-10
  `
  return (
    <SHeader>
      <p className="text-5xl capitalize">Login</p>
      <p className="text-md">I am a fullstack developer.</p>
    </SHeader>
  )
}

export default LoginPage


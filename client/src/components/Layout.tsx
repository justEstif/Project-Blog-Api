import { Outlet } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import NavBar from './NavBar'

const SSiteLayout = tw.div`
  font-serif
  bg-gray-50
`

const SPageLayout = tw.main`
  max-w-2xl
  mx-4
  md:mx-auto
  pt-10
`

const Layout = () => {
  return (
    <SSiteLayout>
      <SPageLayout>
        <NavBar />
        <Outlet />
      </SPageLayout>
    </SSiteLayout>
  )
}

export default Layout

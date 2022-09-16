import { PropsWithChildren } from 'react'
import tw from 'tailwind-styled-components'

const SSiteLayout = tw.div`
  font-serif
  bg-blue-100
`

const SPageLayout = tw.main`
  container
  mx-auto
  pt-5
`

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SSiteLayout>
      <SPageLayout>{children}</SPageLayout>
    </SSiteLayout>
  )
}

export default Layout

import { PropsWithChildren } from 'react'
import tw from 'tailwind-styled-components'

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

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SSiteLayout>
      <SPageLayout>{children}</SPageLayout>
    </SSiteLayout>
  )
}

export default Layout

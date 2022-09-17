import tw from 'tailwind-styled-components'

const Header = () => {
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
      <p className="text-5xl capitalize">Interesting Blog</p>
      <p className="uppercase text-md">Estifanos Beyene</p>
      <p className="capitalize text-md">Abstract</p>
      <p className="text-md">I am a fullstack developer.</p>
    </SHeader>
  )
}

export default Header

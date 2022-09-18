import { HomeIcon, UserIcon, LogoutIcon } from './NavBarIcons'
interface Props {}

// TODO: Add login, logout, register buttons
// TODO: Create usercontext ->
// if user show  logout svg
// else user icon

function NavBar({}: Props) {
  return (
    <nav className="flex justify-between mb-3">
      <HomeIcon />
      {/*If user show logout, else show user icon*/}
      <UserIcon />
      <LogoutIcon />
    </nav>
  )
}

export default NavBar

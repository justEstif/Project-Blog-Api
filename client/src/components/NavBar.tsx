import { HomeIcon, UserIcon, LogoutIcon } from './NavBarIcons'
interface Props {}

// TODO: Create usercontext ->
// if user show  logout svg
// else user icon

function NavBar({}: Props) {
  return (
    <nav className="flex justify-between mb-3">
      <HomeIcon />
      <div className="flex">
        <UserIcon />
        <LogoutIcon />
      </div>
    </nav>
  )
}

export default NavBar

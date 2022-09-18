import { Link } from 'react-router-dom'
import { HomeIcon, UserIcon, LogoutIcon } from './NavBarIcons'
interface Props {}

// TODO: Add login, logout, register buttons
// TODO: Create usercontext ->
// if user show  logout svg
// else user icon

function NavBar({}: Props) {
  return (
    <nav>
      <ul className="flex justify-between mb-3">
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        {/*If user show logout, else show user icon*/}
        <li>
          <Link to="/login">
            <UserIcon />
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <LogoutIcon />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar

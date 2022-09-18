import { Link } from 'react-router-dom'
import { HomeIcon, UserIcon, LogoutIcon, RegisterUserIcon } from './NavBarIcons'
interface Props {}

// TODO: Add login, logout, register buttons
// TODO: Create usercontext ->
// if user show  logout svg
// else user icon

function NavBar({}: Props) {
  return (
    <nav className='mb-7'>
      <ul className="flex justify-between">
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        {/*TODO: If user show logout, else show UserIcon and RegisterUser*/}
        <li>
          <Link to="/login">
            <UserIcon />
          </Link>
        </li>
        <li>
          <Link to="/register">
            <RegisterUserIcon />
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

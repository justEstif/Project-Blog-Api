import { Link } from 'react-router-dom'
import { HomeIcon, UserIcon, LogoutIcon, RegisterUserIcon } from './NavBarIcons'
import useStore from '../store'

interface Props {}

// TODO: Add login, logout, register buttons
// TODO: Create usercontext ->
// if user show  logout svg
// else user icon

function NavBar({}: Props) {
  const store = useStore((state) => state)
  return (
    <nav className="mb-7">
      <ul className="flex justify-between">
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        {/*TODO: If user show logout, else show UserIcon and RegisterUser*/}
        {store.user ? (
          <li>
            <Link to="/logout">
              <LogoutIcon />
            </Link>
          </li>
        ) : (
          <div className='flex gap-3'>
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
          </div>
        )}
      </ul>
    </nav>
  )
}

export default NavBar

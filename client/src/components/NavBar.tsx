import { Link } from 'react-router-dom'
import { HomeIcon, UserIcon, LogoutIcon, RegisterUserIcon } from './NavBarIcons'
import useStore from '../store'
import { useEffect } from 'react'

interface Props {}

// TODO: Add login, logout, register buttons
// TODO: Create usercontext ->
// if user show  logout svg
// else user icon

// TODO: some kind of logout handler
function NavBar({}: Props) {
  const store = useStore((state) => state)
  const handleLogout = () => {
    store.logoutUser()
  }

  return (
    <nav className="mb-7">
      <ul className="flex justify-between">
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        {store.user ? (
          <button onClick={handleLogout}>
            <LogoutIcon />
          </button>
        ) : (
          <div className="flex gap-3">
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

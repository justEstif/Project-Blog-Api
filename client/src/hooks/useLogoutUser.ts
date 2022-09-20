import { useEffect } from 'react'
import { logoutUser } from '../services/api.auth'
import useStore from '../store'

const useLogoutUser = () => {
  const store = useStore((state) => state)
  const token = store.user?.token.token || ''

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutUser(token)
        store.logoutUser()
      } catch (error) {
        console.log(error)
      }
    }
    handleLogout()
  }, [])
}

export default useLogoutUser

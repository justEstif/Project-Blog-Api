import { useState, useEffect } from 'react'
import useStore from '../store'
import IUserCredentials from '../interface/IUserCredentials'
import { loginUser } from '../services/api.auth'

const useLoginUser = () => {
  const store = useStore((state) => state)
  const [message, setMessage] = useState('')
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: '',
    password: ''
  })

  useEffect(() => {
    const handleLogin = async () => {
      const response = await loginUser(userCredentials)
      if (typeof response === 'string') {
        setMessage(message)
      } else {
        store.loginUser(response)
      }
    }
    userCredentials.email !== '' &&
      userCredentials.password !== '' &&
      handleLogin()
  }, [userCredentials])

  return {
    setUserCredentials,
    message
  }
}

export default useLoginUser

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/loginpage'
import HomePage from './pages/homepage'
import Layout from './components/Layout'
import useStore from './store'

interface Props {}

// TODO: Move routes to a constant/Page.Routes.ts
const RouteSwitch = ({}: Props) => {
  const store = useStore((state) => state)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* NOTE: If there is a user redirect to home */}
          <Route
            path="login"
            element={store.user ? <Navigate replace to="/" /> : <LoginPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginpage'
import HomePage from './pages/homepage'
import Layout from './components/Layout'

interface Props {}

const RouteSwitch = ({}: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch


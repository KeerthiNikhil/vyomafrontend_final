import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login'
import AdminLayout from '../components/layout/AdminLayout'
import Dashboard from '../pages/Dashboard'
import Banners from '../pages/Banners'
import ActiveProducts from '../pages/ActiveProducts'
import DisabledProducts from '../pages/DisabledProducts'
import Reviews from '../pages/Reviews'
import Payments from '../pages/Payments'
import Vendors from '../pages/Vendors'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="banners" element={<Banners />} />
        <Route path="products/active" element={<ActiveProducts />} />
        <Route path="products/disabled" element={<DisabledProducts />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="payments" element={<Payments />} />
        <Route path="vendors" element={<Vendors />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
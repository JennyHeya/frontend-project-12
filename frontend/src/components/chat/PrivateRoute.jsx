import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

const PrivateRoute = ({ children }) => {
  const { user, initialized } = useAuth()
  if (!initialized) return null
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute


import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext)

  return auth?.loggedIn ? children : <Navigate to="/login" />
}

export default PrivateRoute
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext.jsx'

const PrivateRoute = ({ children }) => {
  const { user, initialized } = useAuth()
  const { t } = useTranslation()
  
  if (!initialized) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </div>
      </div>
    )
  }
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute


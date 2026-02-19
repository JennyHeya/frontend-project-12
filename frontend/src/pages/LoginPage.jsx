import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks'
import { userRoutes, pagesRoutes } from '../api/routes'
import api from '../api/requests'

import Login from '../components/Login'
import { loginSchema } from '../utils/validationSchemas'
import { handleLoginSubmit } from '../utils/authHandlers'

const LoginPage = () => {
  const [isAuthFailed, setIsAuthFailed] = useState(false)
  const navigate = useNavigate()
  const auth = useAuth()

  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    onSubmit: (values, actions) =>
      handleLoginSubmit(values, actions, auth, navigate, t, toast, api, userRoutes, pagesRoutes, setIsAuthFailed),
  })

  return <Login props={{ isAuthFailed, formik, err: auth.authError }} />
}

export default LoginPage

import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks'
import { userRoutes, pagesRoutes } from '../api/routes'
import api from '../api/requests'

import Signup from '../components/Signup'
import { signupSchema } from '../utils/validationSchemas'
import { handleSignupSubmit } from '../utils/authHandlers'

const SignupPage = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    validateOnChange: true,
    onSubmit: (values, actions) =>
      handleSignupSubmit(values, actions, auth, navigate, t, toast, api, userRoutes, pagesRoutes),
  })

  return (
    <Signup props={{ err: auth.authError, formik }} />
  )
}

export default SignupPage

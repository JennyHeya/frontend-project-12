import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks'
import { userRoutes, pagesRoutes } from '../api/routes'
import api from '../api/requests'

import Signup from '../components/Signup'

const SignupPage = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const { t } = useTranslation()

  const schema = yup.object({
    username: yup
      .string()
      .min(3, t('validation.signup.nameLength'))
      .max(20, t('validation.signup.nameLength'))
      .required(t('validation.required')),
    password: yup
      .string()
      .min(6, t('validation.signup.passwordLength'))
      .required(t('validation.required')),
    confirmPassword: yup
      .string()
      .required(t('validation.required'))
      .min(6, t('validation.signup.passwordLength'))
      .oneOf([yup.ref('password')], t('validation.signup.notConfirmPassword')),
  })
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values) => {
      auth.updateAuthError(null)
      try {
        const res = await api('post', userRoutes.signupPath(), values)
        localStorage.setItem('userId', JSON.stringify(res.data))
        const { username } = values
        auth.logIn()
        auth.addUser({ username })
        navigate(`${pagesRoutes.chat()}`)
      }
      catch (err) {
        const authError = err.status ?? err.code
        auth.updateAuthError(authError)
        if (authError === 409) return
        toast.error(t([`errors.${authError}`, 'errors.default']))
      }
    },
  })

  return (
    <Signup props={{ err: auth.authError, formik }} />
  )
}

export default SignupPage

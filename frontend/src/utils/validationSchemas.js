import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'errors.min3')
    .max(20, 'errors.max20')
    .required('errors.required'),
  password: yup.string()
    .min(6, 'errors.min6')
    .required('errors.required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'errors.passwordMismatch')
    .required('errors.required'),
})

export const loginSchema = t =>
  yup.object().shape({
    username: yup.string()
      .min(3, t('errors.min3'))
      .required(t('errors.required')),
    password: yup.string()
      .required(t('errors.required')),
  })

export const channelNameSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Имя канала обязательно'),
})

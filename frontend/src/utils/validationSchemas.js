import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'validation.signup.nameLength')
    .max(20, 'validation.signup.nameLength')
    .required('validation.required'),
  password: yup
    .string()
    .min(6, 'validation.signup.passwordLength')
    .required('validation.required'),
  confirmPassword: yup
    .string()
    .required('validation.required')
    .min(6, 'validation.signup.passwordLength')
    .oneOf([yup.ref('password')], 'validation.signup.notConfirmPassword'),
})

export const loginSchema = yup.object().shape({
  username: yup.string().required('validation.required'),
  password: yup.string().required('validation.required'),
})

export const channelNameSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'validation.channel.nameLength')
    .max(20, 'validation.channel.nameLength')
    .required('validation.required'),
})

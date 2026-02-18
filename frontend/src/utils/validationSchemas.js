import * as yup from 'yup'

export const signupSchema = yup.object({
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

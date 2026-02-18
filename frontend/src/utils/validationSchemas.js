import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
})

export const loginSchema = yup.object().shape({
  username: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
})

export const channelNameSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Имя канала обязательно'),
})

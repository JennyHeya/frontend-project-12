import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const SignupPage = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const schema = yup.object({
    username: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  return (
    <div className="h-100 bg-light">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="https://via.placeholder.com/200"
                    className="rounded-circle"
                    alt="Регистрация"
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Регистрация</h1>

                  <Formik
                    initialValues={{ username: '', password: '', confirmPassword: '' }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSignupFailed(false);
                      try {
                        const response = await axios.post('/api/v1/signup', {
                          username: values.username,
                          password: values.password,
                        });
                        logIn(response.data);
                        navigate('/');
                      } catch (err) {
                        setSubmitting(false);
                        if (err.response?.status === 409) {
                          setSignupFailed(true);
                        } else {
                          console.error(err);
                        }
                      }
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <div className="mb-3">
                          <Field
                            name="username"
                            placeholder="Ваш ник"
                            autoComplete="username"
                            className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                          />
                          {touched.username && errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <Field
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            autoComplete="new-password"
                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                          />
                          {touched.password && errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Подтвердите пароль"
                            autoComplete="new-password"
                            className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                          />
                          {touched.confirmPassword && errors.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                          )}
                        </div>

                        {signupFailed && (
                          <div className="text-danger mb-3">Пользователь уже существует</div>
                        )}

                        <button
                          type="submit"
                          className="w-100 btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                      </Form>
                    )}
                  </Formik>

                  <div className="text-center mt-3">
                    <span>Уже есть аккаунт? </span>
                    <Link to="/login">Войти</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage

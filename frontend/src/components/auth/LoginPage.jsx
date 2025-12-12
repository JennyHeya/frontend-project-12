import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  return (
    <div className="h-100 bg-light">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="https://via.placeholder.com/200" className="rounded-circle" alt="Войти" />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={async (values, { setSubmitting }) => {
                      setAuthFailed(false);
                      try {
                        const response = await axios.post('/api/v1/login', values);
                        logIn(response.data);
                        navigate('/');
                      } catch (err) {
                        setSubmitting(false);
                        if (err.response?.status === 401) {
                          setAuthFailed(true);
                        }
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-3">
                          <Field
                            name="username"
                            autoComplete="username"
                            required
                            placeholder="Ваш ник"
                            id="username"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <Field
                            name="password"
                            autoComplete="current-password"
                            required
                            placeholder="Пароль"
                            type="password"
                            id="password"
                            className="form-control"
                          />
                          {authFailed && (
                            <div className="text-danger mt-2">Неверные имя пользователя или пароль</div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="w-100 mb-3 btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          Войти
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <div className="text-center">
                    <span>Нет аккаунта? </span>
                    <a href="/signup">Регистрация</a>
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

export default LoginPage

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext.jsx';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { t } = useTranslation();

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
                    alt={t('login.title')}
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{t('login.title')}</h1>

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
                            placeholder={t('login.username')}
                            id="username"
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3">
                          <Field
                            name="password"
                            autoComplete="current-password"
                            required
                            placeholder={t('login.password')}
                            type="password"
                            id="password"
                            className="form-control"
                          />
                          {authFailed && (
                            <div className="text-danger mt-2">
                              {t('login.error')}
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-100 mb-3 btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          {t('login.submit')}
                        </button>
                      </Form>
                    )}
                  </Formik>

                  <div className="text-center">
                    <span>{t('login.noAccount')} </span>
                    <Link to="/signup">{t('login.signupLink')}</Link>
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

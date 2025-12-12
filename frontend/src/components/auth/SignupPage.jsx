import { useState } from 'react';
import logo from '../../assets/react.svg';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext.jsx';

const SignupPage = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  const schema = yup.object({
    username: yup
      .string()
      .trim()
      .min(3, t('signup.errors.usernameLength'))
      .max(20, t('signup.errors.usernameLength'))
      .required(t('signup.errors.required')),
    password: yup
      .string()
      .min(6, t('signup.errors.passwordLength'))
      .required(t('signup.errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('signup.errors.passwordMatch'))
      .required(t('signup.errors.required')),
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
                    src={logo}
                    className="rounded-circle"
                    alt={t('signup.title')}
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{t('signup.title')}</h1>

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
                            placeholder={t('signup.username')}
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
                            placeholder={t('signup.password')}
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
                            placeholder={t('signup.confirmPassword')}
                            autoComplete="new-password"
                            className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                          />
                          {touched.confirmPassword && errors.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                          )}
                        </div>

                        {signupFailed && (
                          <div className="text-danger mb-3">{t('signup.errors.userExists')}</div>
                        )}

                        <button
                          type="submit"
                          className="w-100 btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? t('signup.submit') + '...' : t('signup.submit')}
                        </button>
                      </Form>
                    )}
                  </Formik>

                  <div className="text-center mt-3">
                    <span>{t('signup.hasAccount')} </span>
                    <Link to="/login">{t('signup.loginLink')}</Link>
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

export default SignupPage;

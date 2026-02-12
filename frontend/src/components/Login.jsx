import { Link } from 'react-router-dom'

import {
  Row, Col, Form, Button,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { pagesRoutes } from '../api/routes'

const Login = ({ props }) => {
  const { formik, err } = props
  const { t } = useTranslation()

  return (
    <main className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 ">
          <div
            className="shadow-sm row "
            style={{ backgroundColor: 'var(--bs-body-bg)' }}
          >
            <div className="d-flex col-12 col-md-6 justify-content-center align-content-center p-5">
              <img
                className="rounded-circle m-auto"
                src="/img-1.jpg"
                alt={t('forms.authTitle')}
              />
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0 text-center p-4">
              <h1>{t('forms.authTitle')}</h1>
              <Form className="mb-4" onSubmit={formik.handleSubmit}>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    type="text"
                    className={
                      formik.errors.username && formik.touched.username
                        ? 'is-invalid'
                        : ''
                    }
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder={t('forms.authName')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={
                      err === 401
                      || (formik.errors.username && formik.touched.username)
                    }
                  />
                  <Form.Label>{t('forms.authName')}</Form.Label>
                  {formik.errors.username && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control
                    type="password"
                    className={
                      formik.errors.password && formik.touched.password
                        ? 'is-invalid'
                        : ''
                    }
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder={t('forms.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={
                      err === 401
                      || (formik.errors.password && formik.touched.password)
                    }
                  />
                  <Form.Label>{t('forms.password')}</Form.Label>
                  {(formik.errors.password || err === 401) && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password || t('errors.401')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button className="w-100 mb-3 btn btn-primary" type="submit">
                  {t('forms.authButton')}
                </Button>
              </Form>
            </div>
            <div className="col-12 shadow-sm text-center p-3 bg-light">
              <span className="pe-1">
                {t('forms.notAccount')}
              </span>
              <Link to={pagesRoutes.signup()}>
                {t('forms.signup')}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  )
}

export default Login

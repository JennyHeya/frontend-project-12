import {
  Row, Col, Form, Button,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Signup = ({ props }) => {
  const { err, formik } = props
  const { t } = useTranslation()

  return (
    <main className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <div
            className="shadow-sm row"
            style={{ backgroundColor: 'var(--bs-body-bg)' }}
          >
            <div className="d-flex col-12 col-md-6 justify-content-center align-content-center p-5">
              <img
                className="rounded-circle m-auto"
                src="/img-2.jpg"
                alt={t('forms.registrationTitle')}
              />
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0 text-center p-4">
              <h1>{t('forms.registrationTitle')}</h1>
              <Form className="mb-4" onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    required=""
                    aria-describedby="userNameHelpBlock"
                    placeholder={t('forms.registrationName')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={
                      err === 409
                      || (formik.errors.username && formik.touched.username)
                    }
                  />
                  <Form.Label>
                    {t('forms.registrationName')}
                  </Form.Label>
                  {formik.errors.username && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    placeholder={t('forms.password')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                  />
                  <Form.Label>
                    {t('forms.password')}
                  </Form.Label>
                  {formik.errors.password && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  className="form-floating mb-3"
                  controlId="confirmPassword"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    placeholder={t('forms.confirmPassword')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      formik.errors.confirmPassword
                      && formik.touched.confirmPassword
                    }
                  />
                  <Form.Label>
                    {t('forms.confirmPassword')}
                  </Form.Label>
                  {(formik.errors.confirmPassword || err === 409) && (
                    <Form.Control.Feedback type="invalid" tooltip style={{ display: 'block' }}>
                      {formik.errors.confirmPassword || t('errors.409')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button className="w-100 mb-3 btn btn-primary" type="submit">
                  {t('forms.registrationButton')}
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  )
}

export default Signup

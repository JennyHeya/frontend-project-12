import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
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
                <Formik initialValues={{ username: '', password: '' }} onSubmit={() => {}}>
                  <Form>
                    <div className="mb-3">
                      <Field name="username" placeholder="Ваш ник" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <Field name="password" type="password" placeholder="Пароль" className="form-control" required />
                    </div>
                    <button type="submit" className="w-100 btn btn-outline-primary">Войти</button>
                  </Form>
                </Formik>
                <div className="text-center mt-3">
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
)

export default LoginPage

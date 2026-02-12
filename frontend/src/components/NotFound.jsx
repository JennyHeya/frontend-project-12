import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { pagesRoutes } from '../api/routes'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <main className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={12} md={8} lg={5} className="text-center">
          <img
            className="img-fluid h-25"
            src="/404.svg"
            alt="страница не найдена"
          />
          <h1 className="text-muted">{t('notFoundPage.notFound')}</h1>
          <p>
            {t('notFoundPage.goTo')}
            <Link to={pagesRoutes.chat()}>{t('notFoundPage.link')}</Link>
          </p>
        </Col>
      </Row>
    </main>
  )
}

export default NotFound

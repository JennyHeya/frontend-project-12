import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center p-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="display-6">{t('notFound.title')}</p>
      <p>
        <Link to="/">{t('notFound.link')}</Link>
      </p>
    </div>
  )
}

export default NotFoundPage


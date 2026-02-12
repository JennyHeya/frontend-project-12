import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useAuth } from '../hooks'
import { pagesRoutes } from '../api/routes'

const RenderLogOut = () => {
  const auth = useAuth()
  const { t } = useTranslation()

  return (
    <Button type="button" className="btn-primary" onClick={auth.logOut}>
      {t('forms.signout')}
    </Button>
  )
}

const Header = () => {
  const auth = useAuth()

  return (
    <header className="shadow-sm bg-white ">
      <Navbar className=" navbar-expand-lg container justify-content-between">
        <Link to={pagesRoutes.chat()} className="navbar-brand">
          Hexlet Chat
        </Link>
        {auth.loggedIn && <RenderLogOut />}
      </Navbar>
    </header>
  )
}

export default Header
